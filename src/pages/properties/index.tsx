import { Button, RootLayout } from '@/components'
import Link from 'next/link'

const Properties: React.FC = () => {
  return (
    <RootLayout>
      <Button>
        <Link href="/properties/addPropertie">Add Propertie</Link>
      </Button>
    </RootLayout>
  )
}

export default Properties
