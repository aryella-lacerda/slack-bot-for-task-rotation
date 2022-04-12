import rotations from '../../seed/rotations.json'
import { getAllRotations } from './get-all-rotations'

it('should get all rotations in table', async () => {
  // Arrange
  // --> The table is seeded in the jest.setup.ts file
  // Act
  const items = await getAllRotations()
  // Assert
  expect(items).toEqual(rotations)
})
