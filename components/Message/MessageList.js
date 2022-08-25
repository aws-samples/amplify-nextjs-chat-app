import { Flex } from '@aws-amplify/ui-react'
import { MessageItem } from './index'

export const MessageList = ({ messages = [], myUsername }) => {
	return (
		<Flex
			flex="1"
			backgroundColor="white"
			style={{ overflowY: 'scroll' }}
			direction="column-reverse"
			padding="5px"
		>
			{messages.map((msg) => (
				<MessageItem key={msg.id} msg={msg} myUsername={myUsername} />
			))}
		</Flex>
	)
}
