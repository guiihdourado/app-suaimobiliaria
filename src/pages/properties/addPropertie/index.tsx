import { MultiStep, RootLayout } from '@/components'
import { useCallback, useMemo } from 'react'
import { Step1, Step2, Step3, Step4 } from './steps'
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
  const { control, formState, register, setValue, watch, setError, getValues, clearErrors } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  })

  const {
    address, 
    addressNumber, 
    bathroomsNumber,
    bedroomsNumber,
    category, 
    city,
    complement,
    description,
    garagesNumber,
    images,
    iptu,
    name,
    neighborhood,
    price,
    propertyStatus,
    propertyType,
    state,
    subCategory,
    suitesNumber,
    totalArea,
    usefulArea,
    zipCode
  } = watch()

  const schameStep1 = useMemo(() => {
    return yup.object().shape({
      propertyStatus: yup.string().required('Status obrigatório'),
      category: yup.object().shape(({
        label: yup.string().required('Categoria obrigatória'),
        value: yup.string().required('Categoria obrigatória'),
      })).required('Categoria obrigatória'),
      subCategory: yup.object().shape(({
        label: yup.string().required('Subcategoria obrigatória'),
        value: yup.string().required('Subcategoria obrigatória'),
      })).required('Subcategoria obrigatória'),
    })
  }, [])

  const validateStep1 = useMemo(() => {
    return {
      propertyStatus,
      category,
      subCategory,
    }
  }, 
  [ 
    propertyStatus, 
    category, 
    subCategory
  ])

  const schemaStep2 = useMemo(() => {
    return yup.object().shape({
      zipCode: yup.string().required('CEP obrigatório'),
      address: yup.string().required('Endereço obrigatório'),
      city: yup.string().required('Cidade obrigatória'),
      addressNumber: yup.string().required('Número obrigatório'),
      state: yup.string().required('Estado obrigatório'),
      neighborhood: yup.string().required('Bairro obrigatório'),
      complement: yup.string(),
    })
  },[])

  const validateStep2 = useMemo(() => {
    return {
      zipCode,
      address,
      city,
      addressNumber,
      state,
      neighborhood,
      complement,
    }
  }, [
    zipCode,
    address,
    city,
    addressNumber,
    state,
    neighborhood,
    complement
  ])

  const schemaStep3 = useMemo(() => {
    return yup.object().shape({
      usefulArea: yup.number().min(1, 'Área útil deve ser maior ou igual a 1').required('Área útil obrigatória'),
      totalArea: yup.number().min(1, 'Área total deve ser maior ou igual a 1').required('Área total obrigatória'),
      bedroomsNumber: yup.number(),
      bathroomsNumber: yup.number(),
      garagesNumber: yup.number(),
      suitesNumber: yup.number(),
      price: yup.number().min(1, 'Preço deve ser maior ou igual a 1').required('Preço obrigatório'),
      iptu: yup.number().min(1, 'Iptu deve ser maior ou igual a 1').required('IPTU obrigatório'),
      name: yup.string().required('Nome obrigatório'),
      description: yup.string().required('Descrição obrigatória'),
    })
  }, [])

  const validateStep3 = useMemo(() => {
    return {
      usefulArea,
      totalArea,
      bedroomsNumber,
      bathroomsNumber,
      garagesNumber,
      suitesNumber,
      price,
      iptu,
      name,
      description,
    }
  }, [
    usefulArea,
    totalArea,
    bedroomsNumber,
    bathroomsNumber,
    garagesNumber,
    suitesNumber,
    price,
    iptu,
    name,
    description,
  ])

  const schemaStep4 = useMemo(() => {
    return yup.object().shape({
      images: yup.array().required('Imagens obrigatórias'),
    })
  }, [])

  const validateStep4 = useMemo(() => {
    return {
      images,
    }
  }, [images])
 
  const steps = useMemo(() => {
    return [
      {
        step: (
          <Step1 
            control={control} 
            setValue={setValue} 
            category={category} 
            subCategory={subCategory}
            propertyStatus={propertyStatus} 
            formState={formState}
          />
        ),
        stepNumber: 1,
        stepTitle: 'Principais',
        schema: schameStep1,
        validation: validateStep1
      },
      {
        step: (
          <Step2
            formState={formState}
            register={register}
            setValue={setValue}
            watch={watch}
          />
        ),
        stepNumber: 2,
        stepTitle: 'Localização',
        schema: schemaStep2,
        validation: validateStep2
      },
      {
        step: <Step3 control={control} register={register} formState={formState} />,
        stepNumber: 3,
        stepTitle: 'Caracteríticas principais',
        schema: schemaStep3,
        validation: validateStep3
      },
      {
        step: (
          <Step4
            register={register}
            setValue={setValue}
            watch={watch}
          />
        ),
        stepNumber: 4,
        stepTitle: 'Compartilhe fotos do imóvel!',
        schema: schemaStep4,
        validation: validateStep4
      },
    ]
  }, [control, formState, register, setValue, watch])
  
  return (
    <RootLayout>
      <MultiStep steppers={steps} title="Vamos criar seu anúncio!" setError={setError} clearErrors={clearErrors} />
    </RootLayout>
  )
}

export default AddProperties
