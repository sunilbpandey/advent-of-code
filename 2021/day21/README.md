# Day 21: Dirac Dice

https://adventofcode.com/2021/day/21

## Part 1

The simple approach of rolling the die, moving the pawn and keeping track of the scores works for this part. But we can simplify the code slightly by directly calculating the total roll at each turn.

On turn 1, the die will roll 1 + 2 + 3. This is (3t - 2) + (3t - 1) + 3t, where t = 1.

On turn 2, the die will roll 4 + 5 + 6. Again, this is (3t - 2) + (3t - 1) + 3t, where t = 2.

This formula continues to work till turn 33. On turn 34, the die wraps around to 1, and this formula doesn't work anymore. But it can be easily modified to work.

On turn 34, the die will roll 100 + 1 + 2. This is (3t - 2 - 1) % 100 + 1 + (3t - 1 - 1) % 100 + 1 + (3t - 1) % 100 + 1.

Now we have a formula that works for all values of t. The total roll on any turn, t, is (3t - 3) % 100 + (3t - 2) % 100 + (3t - 1) % 100 + 3.