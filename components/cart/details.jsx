import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from 'instance'
import { Button, chakra, Divider, Flex, Select, Text, useToast } from '@chakra-ui/react'
import Card from 'components/_card'
import Toast from 'components/_toast'

const Details = ({ user, carts }) => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const [isLoading, setIsLoading] = useState(false)
	const toast = useToast()

	const addMutation = useMutation((data) => api.create('/orders', data), {
		onSuccess: () => {
			queryClient.invalidateQueries('orders')
			setIsLoading(false)
			router.push('/profile')

			toast({
				position: 'top',
				duration: 1000,
				render: () => <Toast title="Success" description="Order placed successfully." />
			})
		}
	})

	const subtotal = (data) => {
		let sum = 0

		data.forEach((data) => {
			sum += data.product.price * data.quantity
		})

		return sum
	}

	const discount = (data) => {
		let sum = 0

		data.forEach((data) => {
			sum += data.product.price * data.quantity * (data.product.discount.percentage / 100)
		})

		return sum
	}

	const total = (data) => {
		return subtotal(data) - discount(data)
	}

	const onSubmit = () => {
		if (!user.contact && !user.address.region && !user.address.city && !user.address.barangay && !user.address.streets && !user.address.postal) {
			toast({
				position: 'top',
				duration: 1000,
				render: () => <Toast title="Error" description="Please complete your profile information." status="error" />
			})

			router.push('/profile')

			return
		}

		if (total(carts) === 0) {
			toast({
				position: 'top',
				duration: 1000,
				render: () => <Toast title="Error" description="Shopping cart is empty." status="error" />
			})

			return
		}

		setIsLoading(true)

		addMutation.mutate({
			user: user._id,
			items: carts,
			subtotal: subtotal(carts),
			discount: discount(carts),
			total: total(carts),
			method: 'Cash On Delivery'
		})
	}

	return (
		<Card>
			<Flex direction="column" gap={6}>
				<Text fontSize={18} fontWeight="semibold" color="accent-1">
					Order Summary
				</Text>

				<Flex direction="column" gap={3}>
					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="sm" fontWeight="medium">
							Subtotal
						</Text>

						<Text fontSize="sm" fontWeight="medium" color="accent-1">
							₱{subtotal(carts).toFixed(2)}
						</Text>
					</Flex>

					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="sm" fontWeight="medium">
							Discount
						</Text>

						<Text fontSize="sm" fontWeight="medium" color="accent-1">
							₱{discount(carts).toFixed(2)}
						</Text>
					</Flex>

					<Divider />

					<Flex justify="space-between" align="center" gap={6}>
						<Text fontSize="sm" fontWeight="medium">
							Total
						</Text>

						<Text fontSize="sm" fontWeight="medium" color="accent-1">
							₱{total(carts).toFixed(2)}
						</Text>
					</Flex>
				</Flex>

				<Flex direction="column" gap={3}>
					<Select size="lg">
						<chakra.option>Cash On Delivery</chakra.option>
					</Select>

					<Button size="lg" colorScheme="brand" isLoading={isLoading} onClick={onSubmit}>
						Place Order
					</Button>
				</Flex>
			</Flex>
		</Card>
	)
}

export default Details
