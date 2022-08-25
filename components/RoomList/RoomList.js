import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	View,
} from '@aws-amplify/ui-react'

export const RoomList = ({ handleMenuToggle, rooms = [] }) => {
	return (
		<View>
			<Table variation="striped" highlightOnHover>
				<TableHead>
					<TableRow>
						<TableCell as="th">Application Rooms</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rooms.map((room) => (
						<TableRow
							key={room.id}
							onClick={() => {
								console.log(room.id)
								handleMenuToggle(room.id)
							}}
						>
							<TableCell>{room.name}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</View>
	)
}
