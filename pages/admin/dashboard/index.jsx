import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { chakra, Container, Flex, Grid, GridItem, Select, Text } from '@chakra-ui/react'
import Statistics from 'components/dashboard/statistics'
import Orders from 'components/dashboard/orders'

const Dashboard = () => {
	const { register, watch, setValue } = useForm()

	useEffect(() => {
		setValue('sales_query', 'net')
	}, [])

	return (
		<Container>
			<Flex direction="column" gap={6}>
				<Flex justify="space-between" align="center" gap={6}>
					<Text fontSize={32} fontWeight="bold" color="accent-1">
						Dashboard
					</Text>

					<Select size="lg" w="auto" {...register('sales_query')}>
						<chakra.option value="net">Net Sales</chakra.option>
						<chakra.option value="daily">Daily Sales</chakra.option>
						<chakra.option value="weekly">Weekly Sales</chakra.option>
						<chakra.option value="monthly">Monthly Sales</chakra.option>
						<chakra.option value="yearly">Yearly Sales</chakra.option>
					</Select>
				</Flex>

				<Grid templateColumns="repeat(12, 1fr)" gap={6}>
					<Statistics sales_query={watch('sales_query')} />

					<GridItem colSpan={12}>
						<Orders />
					</GridItem>
				</Grid>
			</Flex>
		</Container>
	)
}

export default Dashboard
