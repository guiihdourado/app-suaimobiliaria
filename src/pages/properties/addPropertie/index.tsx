import { MultiStep, RootLayout } from '@/components'
import { useMemo } from 'react'
import { Step1, Step2 } from './steps'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'
import { useForm } from 'react-hook-form'

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  description: yup.string().required('Descrição obrigatória'),
  propertyStatus: yup.string().required('Status obrigatório'),
  propertyType: yup.string().required('Tipo obrigatório'),
  category: yup.string().required('Categoria obrigatória'),
  subCategory: yup.string().required('Subcategoria obrigatória'),
  zipCode: yup.string().required('CEP obrigatório'),
  address: yup.string().required('Endereço obrigatório'),
  city: yup.string().required('Cidade obrigatória'),
  addressNumber: yup.string().required('Número obrigatório'),
  state: yup.string().required('Estado obrigatório'),
  neighborhood: yup.string().required('Bairro obrigatório'),
  complement: yup.string().required('Complemento obrigatório'),
  usefulArea: yup.string().required('Área útil obrigatória'),
  totalArea: yup.string().required('Área total obrigatória'),
  bedroomsNumber: yup.number().required('Número de quartos obrigatório'),
  bathroomsNumber: yup.number().required('Número de banheiros obrigatório'),
  garagesNumber: yup.number().required('Número de vagas obrigatório'),
  suitesNumber: yup.number().required('Número de suítes obrigatório'),
  price: yup.number().required('Preço obrigatório'),
  iptu: yup.number().required('IPTU obrigatório'),
  images: yup.array().required('Imagens obrigatórias'),
})

type LoginForm = yup.InferType<typeof schema>

const AddProperties: React.FC = () => {
  const { control } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })
  const steps = useMemo(() => {
    return [
      {
        step: <Step1 control={control} />,
        stepNumber: 1,
        stepTitle: 'Principais',
      },
      {
        step: <Step2 />,
        stepNumber: 2,
        stepTitle: 'Localização',
      },
    ]
  }, [control])
  return (
    <RootLayout>
      <MultiStep steppers={steps} title="Vamos criar seu anúncio!" />
    </RootLayout>
  )
}

export default AddProperties
