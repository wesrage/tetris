import { generateBag } from '../RandomGenerator';

it('generates a sequence containing one of each Tetromino type', () => {
   expect(generateBag().sort()).toEqual(['I', 'J', 'L', 'O', 'S', 'T', 'Z']);
});
