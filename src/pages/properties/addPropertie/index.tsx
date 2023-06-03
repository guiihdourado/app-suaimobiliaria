import { MultiStep, RootLayout } from '@/components'
import { useMemo, useState } from 'react'
import { Step1, Step2, Step3, Step4 } from './steps'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router';

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { api } from '@/services/api'



type LoginForm = {
  name: string
  description: string
  propertyStatus: string
  propertyType: string
  category: {
    label: string
    value: string
  }
  subCategory: {
    label: string
    value: string
  }
  zipCode: string
  address: string
  city: string
  addressNumber: string
  state: string
  neighborhood: string
  complement: string
  usefulArea: string
  totalArea: string
  bedroomsNumber: number
  bathroomsNumber: number
  garagesNumber: number
  suitesNumber: number
  price: number
  iptu: number
  images: string[]
}

const AddProperties: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();

  const schema = useMemo(() => {
    return yup.object().shape({})
  }, [])

  const { control, formState, register, setValue, watch, setError, clearErrors, handleSubmit } = useForm<LoginForm>({
    resolver: yupResolver(schema)
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
      propertyStatus: yup.string().required('Status do imóvel obrigatório'),
      propertyType: yup.string().required('Tipo do imóvel obrigatório'),
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
      propertyType,
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
      complement: yup.string().required('Complemento obrigatório'),
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
      images: yup.array()
        .min(5, 'Pelo menos 5 imagens são obrigatórias')
        .max(50, 'No máximo 50 imagens são permitidas')
        .required('Imagens obrigatórias'),
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
            propertyType={propertyType}
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
            formState={formState}
          />
        ),
        stepNumber: 4,
        stepTitle: 'Compartilhe fotos do imóvel!',
        schema: schemaStep4,
        validation: validateStep4
      },
    ]
  }, [control, formState, register, setValue, watch])

  const handleFinish = handleSubmit((data) => {
    setIsLoading(true);
    const formData = new FormData();
    
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('propertyStatus', data.propertyStatus);
    formData.append('propertyType', data.propertyType);
    formData.append('category', data.category.value);
    formData.append('subCategory', data.subCategory.value);
    formData.append('zipCode', data.zipCode);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('addressNumber', data.addressNumber);
    formData.append('state', data.state);
    formData.append('neighborhood', data.neighborhood);
    formData.append('complement', data.complement);
    formData.append('usefulArea', data.usefulArea);
    formData.append('totalArea', data.totalArea);
    formData.append('bedroomsNumber', String(data.bedroomsNumber));
    formData.append('bathroomsNumber', String(data.bathroomsNumber));
    formData.append('garagesNumber', String(data.garagesNumber));
    formData.append('suitesNumber', String(data.suitesNumber));
    formData.append('price', String(data.price));
    formData.append('iptu', String(data.iptu));
    data.images.forEach((image: any, index) => {
      const fileExtension = image.name.split('.').pop(); 
      const fileName = `image_${index}.${fileExtension}`;
    
      const file = new File([image], fileName, { type: image.type });
    
      formData.append(`images`, file);
    });
    api
      .post('/properties', formData)
      .then(() => {
        router.push('/properties')
        alert('Imóvel cadastrado com sucesso!')
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          alert(data.message)
          return;
        } else {
          alert('Erro ao tentar cadastrar imóvel!')
        }
      })
      .finally(() => setIsLoading(false))
  })
  
  return (
    <RootLayout>
      <MultiStep 
        steppers={steps} 
        title="Vamos criar seu anúncio!" 
        setError={setError} 
        clearErrors={clearErrors} 
        handleFinish={handleFinish}
        isLoading={isLoading}
      />
    </RootLayout>
  )
}

export default AddProperties
