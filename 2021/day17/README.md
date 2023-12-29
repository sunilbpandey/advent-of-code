# Day 17: Trick Shot

https://adventofcode.com/2021/day/17

## Part 1

To start, consider only the vertical position. Since we want to go as high as possible, the starting vertical
velocity must be positive.

Say, the starting vertical velocity is Y. And we know the probe's starting vertical position is 0.

After 1 step, its position will be Y, and velocity will be Y - 1.

After 2 steps, its position will be Y + Y - 1, and velocity will be Y - 2.

Continuing like this, after _k_ steps, its position will be Y + Y - 1 + Y - 2 + ... + Y - k, or kY - k(k - 1)/2. And at this point, its velocity will be Y - k.

After Y steps, the probe's velocity will be 0 and it would have reached its maximum height of Y(Y + 1)/2.

After this, the probe will start coming down, with its velocity gradually becoming more and more negative. Eventually after 2Y + 1 steps from the start, the probe will once again reach the vertical position of 0, moving down with a velocity of -Y - 1.

After 1 more step, its position will be -Y - 1.

After 2 more steps, its position will be -Y - 1 - Y - 2.

And so on, after _k_ more steps, its position will be -kY - k(k + 1)/2.

Say the target area goes from -y1 to -y2, where y1 < y2. This means, for the probe to reach the target area:

-y1 >= -kY - k(k + 1)/2 >= -y2, for some k.

Or,

y1 <= kY + k(k + 1)/2 <= y2

which gives us an uppper bound for Y,

Y <= y2 - 1

So, to achieve the maximum height, we want the highest Y, less than y2, such that the probe's horizontal position will be within the target area.

Now consider the horizontal position. Say, the probe's starting horizontal velocity is X. Since the target area is to the right of the starting position, X must be positive.

Following similar analysis as above, we can see that after _k_ steps, its position will be kX - k(k - 1)/2, and its velocity will be X - k.

After X steps, the probe's horizontal velocity will be 0, and unlike its vertical velocity, its horizontal velocity will not become negative. So, at this point, the probe would have reached it maximum horizontal distance of X(X + 1)/2.

Say the target area goes from x1 to x2. This means, for the probe to reach the target area:

x1 <= kX - k(k - 1)/2 <= x2, for some k <= X

which gives us,

x1 <= X(X + 1)/2 and X <= x2

Now, go through all values of X and Y within these ranges and see if the probe reaches the target area.

## Part 2

In part 2, we are not trying to go as high as possible, so Y can be negative. But it cannot be less than -y2, otherwise the probe will not reach the target area.

X has the same limits as before. Just go through all possible values of X and Y within this new range, and see if the probe reaches the target area.
