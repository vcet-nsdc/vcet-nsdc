// Certificate storage utilities using MongoDB API

export interface StoredCertificate {
  id: string
  name: string
  product: string
  email: string
  certificateNumber: string
  date: string
  imageData?: string
  status?: string
  downloadCount?: number
  shareCount?: number
  createdAt?: string
}

export const saveCertificate = async (certificate: StoredCertificate): Promise<void> => {
  try {
    const response = await fetch('/api/certificates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(certificate),
    })

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to save certificate')
    }
    
    console.log('Certificate saved to MongoDB:', result.certificate)
  } catch (error) {
    console.error('Error saving certificate:', error)
    throw error
  }
}

export const findCertificateByEmail = async (email: string): Promise<StoredCertificate | null> => {
  try {
    const response = await fetch(`/api/certificates?email=${encodeURIComponent(email)}`)
    const result = await response.json()
    
    if (!result.success) {
      if (response.status === 404) {
        return null
      }
      throw new Error(result.message || 'Failed to fetch certificate')
    }
    
    return result.certificate
  } catch (error) {
    console.error('Error fetching certificate:', error)
    return null
  }
}

export const getCertificateById = async (id: string): Promise<StoredCertificate | null> => {
  try {
    const response = await fetch(`/api/certificates/${id}`)
    const result = await response.json()
    
    if (!result.success) {
      if (response.status === 404) {
        return null
      }
      throw new Error(result.message || 'Failed to fetch certificate')
    }
    
    return result.certificate
  } catch (error) {
    console.error('Error fetching certificate by ID:', error)
    return null
  }
}

export const updateCertificateStatus = async (
  id: string, 
  action: 'download' | 'share', 
  imageData?: string
): Promise<StoredCertificate | null> => {
  try {
    const response = await fetch(`/api/certificates/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, imageData }),
    })

    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to update certificate')
    }
    
    return result.certificate
  } catch (error) {
    console.error('Error updating certificate:', error)
    return null
  }
}

export const deleteCertificate = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`/api/certificates/${id}`, {
      method: 'DELETE',
    })

    const result = await response.json()
    
    if (!result.success) {
      if (response.status === 404) {
        return false
      }
      throw new Error(result.message || 'Failed to delete certificate')
    }
    
    return true
  } catch (error) {
    console.error('Error deleting certificate:', error)
    return false
  }
}
