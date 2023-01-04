import { useQuery } from '@tanstack/react-query'
import api from 'instance'
import { Flex, GridItem, Icon, Text } from '@chakra-ui/react'
import { FiGrid, FiPackage, FiUsers } from 'react-icons/fi'
import Card from 'components/_card'
import { sales } from 'functions/sales'

const Statistics = ({ sales_query }) => {
	const { data: users, isFetched: isUsersFetched } = useQuery(['users'], () => api.all('/users'))
	const { data: products, isFetched: isProductsFetched } = useQuery(['products'], () => api.all('/products'))
	const { data: orders, isFetched: isOrdersFetched } = useQuery(['orders'], () => api.all('/orders'))

	const filter = isOrdersFetched
		? orders
				.filter((order) => order.completed.status)
				.map((order) => {
					return { date: order.completed.date, total: order.total }
				})
		: []

	const net = (data) => {
		let sum = 0

		data.map((data) => {
			sum = sum + data.total
		})

		return sum
	}

	return (
		<>
			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								{isUsersFetched ? users.length : 0}
							</Text>

							<Text fontSize="sm" fontWeight="medium" color="accent-1">
								Total Customers
							</Text>
						</Flex>

						<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiUsers} boxSize={6} color="white" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								{isProductsFetched ? products.length : 0}
							</Text>

							<Text fontSize="sm" fontWeight="medium" color="accent-1">
								Total Products
							</Text>
						</Flex>

						<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiGrid} boxSize={6} color="white" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Card>
					<Flex justify="space-between" align="center">
						<Flex direction="column" gap={1} w="calc(100% - 76px)">
							<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
								{isOrdersFetched ? orders.length : 0}
							</Text>

							<Text fontSize="sm" fontWeight="medium" color="accent-1">
								Total Orders
							</Text>
						</Flex>

						<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Icon as={FiPackage} boxSize={6} color="white" />
						</Flex>
					</Flex>
				</Card>
			</GridItem>

			<GridItem colSpan={{ base: 12, md: 6, '2xl': 3 }}>
				<Card cursor="pointer">
					<Flex justify="space-between" align="center">
						{sales_query === 'net' ? (
							<Flex direction="column" gap={1} w="calc(100% - 76px)">
								<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
									₱{net(filter).toFixed(2)}
								</Text>

								<Text fontSize="sm" fontWeight="medium" color="accent-1">
									Net Sales
								</Text>
							</Flex>
						) : sales_query === 'daily' ? (
							<Flex direction="column" gap={1} w="calc(100% - 76px)">
								<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
									₱{isOrdersFetched ? sales(filter, 'daily').toFixed(2) : 0}
								</Text>

								<Text fontSize="sm" fontWeight="medium" color="accent-1">
									Daily Sales
								</Text>
							</Flex>
						) : sales_query === 'weekly' ? (
							<Flex direction="column" gap={1} w="calc(100% - 76px)">
								<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
									₱{isOrdersFetched ? sales(filter, 'weekly').toFixed(2) : 0}
								</Text>

								<Text fontSize="sm" fontWeight="medium" color="accent-1">
									Weekly Sales
								</Text>
							</Flex>
						) : sales_query === 'monthly' ? (
							<Flex direction="column" gap={1} w="calc(100% - 76px)">
								<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
									₱{isOrdersFetched ? sales(filter, 'monthly').toFixed(2) : 0}
								</Text>

								<Text fontSize="sm" fontWeight="medium" color="accent-1">
									Monthly Sales
								</Text>
							</Flex>
						) : (
							sales_query === 'yearly' && (
								<Flex direction="column" gap={1} w="calc(100% - 76px)">
									<Text fontSize="2xl" fontWeight="semibold" color="accent-1" noOfLines={1}>
										₱{isOrdersFetched ? sales(filter, 'yearly').toFixed(2) : 0}
									</Text>

									<Text fontSize="sm" fontWeight="medium" color="accent-1">
										Yearly Sales
									</Text>
								</Flex>
							)
						)}

						<Flex bg="brand.default" justify="center" align="center" borderRadius="full" h={16} w={16}>
							<Text fontSize={24} color="white">
								₱
							</Text>
						</Flex>
					</Flex>
				</Card>
			</GridItem>
		</>
	)
}

export default Statistics
