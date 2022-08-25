import { Flex, Heading, useTheme, View } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react'
import { withSSRContext } from 'aws-amplify'
import { InputArea } from '../../components/InputArea'
import { MessageList } from '../../components/Message'
import { ConversationBar } from '../../components/ConversationBar'
import config from '../../src/aws-exports'
import { Amplify, API } from 'aws-amplify'
import { listMessagesForRoom, listRooms } from '../../src/graphql/queries'
import { createMessage } from '../../src/graphql/mutations'
import { onCreateMessageByRoomId } from '../../src/graphql/subscriptions'
import { useRouter } from 'next/router'
Amplify.configure({ ...config, ssr: true })

function RoomPage({ roomsList, currentRoomData, username }) {
	console.log(username)
	const { tokens } = useTheme()
	const router = useRouter()
	const [messages, setMessages] = useState([])
	const [rooms, setRooms] = useState(roomsList)
	const [currentRoom, setCurrentRoom] = useState(currentRoomData)

	const handleMessageSend = async (newMessage, imgKey) => {
		const createNewMsg = async (text, imageId) => {
			let content = { text, imageId }
			return await API.graphql({
				query: createMessage,
				variables: {
					input: {
						content,
						roomId: currentRoom.id,
					},
				},
			})
		}
		if (newMessage && !imgKey) {
			createNewMsg(newMessage).then(({ data }) =>
				setMessages([data.createMessage, ...messages])
			)
		} else if (!newMessage && imgKey) {
			console.log('the imgkey', imgKey)
			createNewMsg(undefined, imgKey).then(({ data }) =>
				setMessages([data.createMessage, ...messages])
			)
		}
	}

	const handleRoomChange = (roomID) => {
		const newRoom = rooms.find((room) => room.id === roomID)
		setCurrentRoom(newRoom)
		router.push(`/rooms/${roomID}`)
	}

	useEffect(() => {
		API.graphql({
			query: listMessagesForRoom,
			variables: {
				roomId: currentRoom.id,
				sortDirection: 'DESC',
			},
		}).then(({ data }) => setMessages(data.listMessagesForRoom.items))
	}, [currentRoom.id])

	useEffect(() => {
		const subscription = API.graphql({
			query: onCreateMessageByRoomId,
			variables: { roomId: currentRoom.id },
		}).subscribe({
			next: ({ value }) => {
				if (value.data.onCreateMessageByRoomId.owner !== username) {
					console.log(value.data.onCreateMessageByRoomId)
					setMessages((currMsgs) => [
						value.data.onCreateMessageByRoomId,
						...currMsgs,
					])
				}
			},
		})

		return () => subscription.unsubscribe()
	}, [currentRoom.id, username])

	return (
		<>
			<View>
				<Flex direction={{ base: 'column', medium: 'row' }}>
					<ConversationBar rooms={rooms} onRoomChange={handleRoomChange} />
					<View flex={{ base: 0, medium: 1 }}>
						<View margin="0 auto" maxWidth={{ base: '95vw', medium: '100vw' }}>
							<Heading
								style={{ borderBottom: '1px solid black' }}
								padding={tokens.space.small}
								textAlign={'center'}
								level={3}
								color={tokens.colors.blue[60]}
							>
								{currentRoom.name}
							</Heading>
							<Flex direction="column" height="85vh">
								<MessageList messages={messages} myUsername={username} />
								<InputArea onMessageSend={handleMessageSend} />
							</Flex>
						</View>
					</View>
				</Flex>
			</View>
		</>
	)
}

export default RoomPage

export async function getServerSideProps(context) {
	const { API, Auth } = withSSRContext(context)
	try {
		const user = await Auth.currentAuthenticatedUser()
		const { data } = await API.graphql({
			query: listRooms,
		})

		const currentRoomData = data.listRooms.items.find(
			(room) => room.id === context.params.roomId
		)

		return {
			props: {
				currentRoomData,
				username: user.username,
				roomsList: data.listRooms.items,
			},
		}
	} catch (err) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	}
}
