import {
	Button,
	Flex,
	TextAreaField,
	TextField,
	View,
} from '@aws-amplify/ui-react'
import { Storage } from 'aws-amplify'
import { useState } from 'react'

export const InputArea = ({ onMessageSend }) => {
	const [selectedImage, setSelectedImage] = useState(null)
	const [messageText, setMessageText] = useState('')

	const uploadFile = async (selectedPic) => {
		const { key } = await Storage.put(selectedPic.name, selectedPic, {
			contentType: selectedPic.type,
		})

		return key
	}

	const handleFormSubmit = async (e) => {
		e.preventDefault()
		let key
		if (selectedImage) {
			key = await uploadFile(selectedImage)
		}

		onMessageSend(messageText, key)
		setMessageText('')
	}
	return (
		<View
			style={{
				borderTop: '1px solid lightgray',
				padding: '5px',
			}}
		>
			<View>
				<form onSubmit={handleFormSubmit}>
					<TextAreaField
						placeholder="type a message..."
						rows={2}
						onChange={(e) => {
							setMessageText(e.target.value)
						}}
						value={messageText}
					/>
					<hr />
					<Flex justifyContent={'space-between'} alignItems={'center'}>
						<TextField
							type={'file'}
							onChange={(e) => setSelectedImage(e.target.files[0])}
						/>
						<Button variation="primary" type="submit">
							Send
						</Button>
					</Flex>
				</form>
			</View>
		</View>
	)
}
