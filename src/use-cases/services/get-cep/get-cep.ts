import { getCepApi } from './get-cep-api'

type GetCepResponse = {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string

  erro?: string
}

export async function getCep(cep: number): Promise<GetCepResponse | null> {
  try {
    const { data } = await getCepApi.get<GetCepResponse>(`${cep}/json/`)

    if (data?.erro === 'true') {
      throw new Error('CEP inválido')
    }

    return data
  } catch (e) {
    console.log('Get CEP API error:', e)
    return null
  }
}
