import styled from '@emotion/styled'
import { useState } from 'react'
import { centsToDollars } from './utils/money'
import {
  HStack, Flex, Input, Image, Box, NumberInput, Button, Text, Heading,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { AtSignIcon, CalendarIcon } from '@chakra-ui/icons'

function BandForm({ band }) {
  const { description_blurb, imgUrl, ticketTypes } = band
  const [formFields, setFormFields] = useState({ firstName: '', lastName: '', address: '', quantities: {} })

  const quantityHandler = ((quantity, name) => {
    setFormFields((formFields) => {
      return {
        ...formFields,
        quantities: {
          ...formFields.quantities,
          [name]: quantity > 0 ? quantity : 0
        }
      }
    })
  })

  const fieldHandler = ((e) => {
    setFormFields((formFields) => {
      return {
        ...formFields,
        [e.target.name]: e.target.value
      }
    })
  })

  const getTotal = () => {
    return band.ticketTypes.reduce((subtotal, ticket) => {
      const quantity = parseInt(formFields.quantities[ticket.name]) || 0
      return subtotal + (ticket.cost * quantity)
    }, 0)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formFields)
  }

  return (<>
    <BandFormHeader band={band} />
    <HStack spacing='24px' marginTop='24px' alignItems={'top'}>
      <Box boxSize='xs'>
        <main>
          <Image src={imgUrl} alt='No description available' />
          <Description dangerouslySetInnerHTML={{ __html: description_blurb }}></Description>
        </main>
      </Box >
      <Box minBlockSize='md' flex="1">
        <form onSubmit={submitHandler}>
          <Heading as='h2' size='lg'>Select Tickets</Heading>
          {ticketTypes.map((ticket) => {
            return <TicketSelector
              key={ticket.name}
              ticket={ticket}
              quantity={formFields.quantities[ticket.name]}
              placeholder='0'
              onChange={(quantity) => quantityHandler(quantity, ticket.name)}
            />
          })}
          <hr />
          <Text fontSize='3xl'>Total: ${centsToDollars(getTotal())}</Text>
          <ContactFormlet onChange={fieldHandler} />
          <CardFormlet onChange={fieldHandler} />
          <Button type="submit">Get Tickets</Button>
        </form>
      </Box>
    </HStack >
  </>);
}

const ContactFormlet = ({ onChange }) => (<>
  <Flex>
    <Box>
      <label>
        First Name
        <Input type="text" onChange={onChange} name='firstName' />
      </label>
    </Box>
    <Box>
      <label>
        Last Name
        <Input type="text" onChange={onChange} name='lastName' />
      </label>
    </Box>
  </Flex>
  <label>
    Address
    <Input type="text" onChange={onChange} name='address' />
  </label>
</>)

const CardFormlet = ({ onChange }) => (<>
  <label>
    Card Number @todo type?
    <Input type="number" onChange={onChange} name='cardNumber' placeholder='0000 0000 0000 0000' />
  </label>
  <Flex>
    <Box>
      <label>
        Expiration
        <Input type="text" onChange={onChange} name='expDate' placeholder='MM/YY' />
      </label>
    </Box>
    <Box>
      <label>
        CVV
        <Input type="text" onChange={onChange} name='cvv' />
      </label>
    </Box>
  </Flex>
</>)

const TicketSelector = ({ ticket, onChange, quantity, ...props }) => (
  <Box m='12px 2px'>
    <Box key={ticket.name}>
      <Text fontSize='xl'>{ticket.name}</Text>
      <Text>{ticket.description}</Text>
    </Box>
    <NumberInput onChange={onChange} value={quantity || 0} {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
    <Flex>
      <Box><Text fontSize='xl'>${centsToDollars(ticket.cost)}</Text></Box>
    </Flex>
  </Box>
)


const BandFormHeader = ({ band }) => {
  const { name, date, location } = band
  return (<>
    <Flex>
      <header>
        <Heading as='h1' size='2xl'>{name}</Heading>
        <DateTime timestamp={date} />
        <Location><AtSignIcon /> {location}</Location>
      </header>
    </Flex>
  </>)
}

const DateTime = ({ timestamp }) => {
  const date = new Date(timestamp);
  return (<Text><CalendarIcon /> {date.toLocaleString()}</Text>)
}


const Location = ({ children }) => {
  return (<p>{children}</p>)
}

const Description = styled.p``

export default BandForm;
