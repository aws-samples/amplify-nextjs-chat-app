import { Flex, Menu, useBreakpointValue } from '@aws-amplify/ui-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RoomList } from '../RoomList'

export const ConversationBar = ({ rooms = [], onRoomChange }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const variation = useBreakpointValue({
		base: 'isMobile',
		medium: 'isTabletOrHigher',
	})
	const toggleMenu = (roomId) => {
		setIsMenuOpen(false)
		onRoomChange(roomId)
	}

	const ConversationDisplay = ({ rooms = [] }) => {
		if (variation === 'isMobile') {
			return (
				<Flex>
					<Menu
						isOpen={isMenuOpen}
						menuAlign="start"
						onOpenChange={() => {
							setIsMenuOpen(!isMenuOpen)
						}}
					>
						<RoomList rooms={rooms} handleMenuToggle={toggleMenu} />
					</Menu>
				</Flex>
			)
		} else if (variation === 'isTabletOrHigher') {
			return <RoomList rooms={rooms} handleMenuToggle={toggleMenu} />
		}
	}
	return <ConversationDisplay rooms={rooms} />
}
