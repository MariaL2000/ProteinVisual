// Servicio para buscar proteínas en UniProt
export const searchUniProt = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return []
  
  try {
    const response = await fetch(
      `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(searchTerm)}&format=json&size=10`
    )
    
    if (!response.ok) {
      throw new Error(`UniProt API error: ${response.status}`)
    }
    
    const json = await response.json()
    const proteins = json.results || []
    
    return proteins.map(protein => ({
      id: protein.primaryAccession,
      nombre: protein.proteinDescription?.recommendedName?.fullName?.value ||
              protein.proteinDescription?.submissionNames?.[0]?.fullName?.value ||
              'Nombre no disponible',
      secuencia: protein.sequence?.value || 'Secuencia no disponible',
      longitud: protein.sequence?.length || 0,
      organismo: protein.organism?.scientificName || 'Organismo no especificado',
      nombreComun: protein.organism?.commonName || protein.organism?.scientificName || 'N/A',
      funcion: protein.proteinDescription?.recommendedName?.fullName?.value || 'Función no especificada',
      fuente: 'UniProt'
    }))
  } catch (error) {
    console.error('Error buscando en UniProt:', error)
    return []
  }
}

// Servicio para buscar proteínas en NCBI
export const searchNCBI = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return []
  
  try {
    // Primero buscamos los IDs
    const searchResponse = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=protein&term=${encodeURIComponent(searchTerm)}&retmode=json&retmax=10`
    )
    
    if (!searchResponse.ok) {
      throw new Error(`NCBI search error: ${searchResponse.status}`)
    }
    
    const searchJson = await searchResponse.json()
    const ids = searchJson.esearchresult?.idlist || []
    
    if (ids.length === 0) return []
    
    // Luego obtenemos los detalles
    const detailResponse = await fetch(
      `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=protein&id=${ids.join(',')}&retmode=json`
    )
    
    if (!detailResponse.ok) {
      throw new Error(`NCBI detail error: ${detailResponse.status}`)
    }
    
    const detailJson = await detailResponse.json()
    const proteins = detailJson.result || {}
    
    return ids.map(id => {
      const protein = proteins[id] || {}
      return {
        id: protein.uid || id,
        nombre: protein.title?.split('[')[0]?.trim() || 'Nombre no disponible',
        secuencia: 'Usar NCBI para secuencia completa',
        longitud: protein.length || 0,
        organismo: protein.title?.match(/\[([^\]]+)\]/)?.[1] || 'Organismo no especificado',
        nombreComun: protein.title?.match(/\[([^\]]+)\]/)?.[1] || 'N/A',
        funcion: protein.title?.split('[')[0]?.trim() || 'Función no especificada',
        fuente: 'NCBI'
      }
    })
  } catch (error) {
    console.error('Error buscando en NCBI:', error)
    return []
  }
}

// Servicio para buscar estructuras en PDB
export const searchPDB = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') return []
  
  try {
    const response = await fetch('https://search.rcsb.org/rcsbsearch/v2/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: {
          type: "terminal",
          service: "text",
          parameters: {
            attribute: "struct.title",
            operator: "contains_phrase",
            value: searchTerm
          }
        },
        return_type: "entry",
        request_options: {
          results_verbosity: "minimal",
          return_all_hits: false,
          paginate: {
            start: 0,
            rows: 10
          }
        }
      })
    })
    
    if (!response.ok) {
      throw new Error(`PDB API error: ${response.status}`)
    }
    
    const json = await response.json()
    const structures = json.result_set || []
    
    if (structures.length === 0) return []
    
    // Obtener detalles de cada estructura
    const detailPromises = structures.slice(0, 5).map(async (item) => {
      try {
        const detailResponse = await fetch(`https://data.rcsb.org/rest/v1/core/entry/${item.identifier}`)
        
        if (!detailResponse.ok) {
          throw new Error(`PDB detail error: ${detailResponse.status}`)
        }
        
        const detail = await detailResponse.json()
        
        return {
          id: item.identifier,
          nombre: detail.struct?.title || 'Estructura PDB',
          secuencia: 'Ver estructura 3D en PDB',
          longitud: detail.rcsb_entry_info?.deposited_atom_count || 0,
          organismo: detail.rcsb_entry_info?.source_organism_names?.[0] || 'Organismo no especificado',
          nombreComun: detail.rcsb_entry_info?.source_organism_names?.[0] || 'N/A',
          funcion: detail.struct?.title || 'Estructura cristalográfica',
          fuente: 'PDB'
        }
      } catch (error) {
        console.error(`Error obteniendo detalles de PDB ${item.identifier}:`, error)
        return {
          id: item.identifier,
          nombre: 'Estructura PDB',
          secuencia: 'Ver estructura 3D en PDB',
          longitud: 0,
          organismo: 'Organismo no especificado',
          nombreComun: 'N/A',
          funcion: 'Estructura cristalográfica',
          fuente: 'PDB'
        }
      }
    })
    
    return await Promise.all(detailPromises)
  } catch (error) {
    console.error('Error buscando en PDB:', error)
    return []
  }
}

// Función principal que busca en todas las APIs
export const searchProteins = async (searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return { uniprot: [], ncbi: [], pdb: [] }
  }
  
  console.log('Buscando:', searchTerm) // Para debug
  
  try {
    const [uniprotResults, ncbiResults, pdbResults] = await Promise.allSettled([
      searchUniProt(searchTerm),
      searchNCBI(searchTerm),
      searchPDB(searchTerm)
    ])
    
    const results = {
      uniprot: uniprotResults.status === 'fulfilled' ? (uniprotResults.value || []) : [],
      ncbi: ncbiResults.status === 'fulfilled' ? (ncbiResults.value || []) : [],
      pdb: pdbResults.status === 'fulfilled' ? (pdbResults.value || []) : []
    }
    
    console.log('Resultados:', results) // Para debug
    
    return results
  } catch (error) {
    console.error('Error en la búsqueda de proteínas:', error)
    return { uniprot: [], ncbi: [], pdb: [] }
  }
}
