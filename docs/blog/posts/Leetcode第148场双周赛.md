---
title: Leetcode biweekly Contest 148
date: 2025-01-18
categories:
    - 算法比赛
comments: true
draft: true
---

>不是哥们儿！又是两题，后面两道hard是真动不了手啊。鉴定为手速两题场。

>排名：522

<!-- more -->

# Leetcode biweekly Contest 148

## T1 [3423. 循环数组中相邻元素的最大差值](https://leetcode.cn/problems/maximum-difference-between-adjacent-elements-in-a-circular-array/description/)
第一题肥肠温柔，只需要按照题目的意思模拟一遍就行了。遍历一遍数组，计算相邻数的差的绝对值，记录最大值

```java
import java.util.*;
class Solution {
    public int maxAdjacentDistance(int[] nums) {
        int ans = Math.abs(nums[0] - nums[nums.length - 1]);
        for(int i = 0; i < nums.length - 1; i ++) {
            ans = Math.max(ans, Math.abs(nums[i] - nums[i + 1]));
        }
        return ans;
    }
}
```

## T2 [3424. 将数组变相同的最小代价](https://leetcode.cn/problems/minimum-cost-to-make-arrays-identical/?slug=maximum-difference-between-adjacent-elements-in-a-circular-array&region=local_v2)

第二题做的时候还是比较不确定的，比赛的时候是按照贪心的想法来猜的。可以知道重新排列可以划分成每个子数组只包含一个数，即重新排列没有限制，可以花费 $k$ 的代价对数组进行任意的摆放。那么我想的就是把每个数摆放到与它差值最小的数的位置上去，这样每个数的差值的绝对值都小，最后得到的差值的总和也最小。

从0x3f那看的交换论证法可以在这里使用，即对于 $brr$ 中的每个数，若 $arr$ 不把与其差值最小的数放到对应的位置上，那么得到的差值一定比之前的大，所以按照原思路贪心是对的。

```java
import java.util.*;
class Solution {
    public long minCost(int[] arr, int[] brr, long k) {
        long ans1 = 0;
        int n = arr.length;

        for(int i = 0; i < n; i ++) {
            ans1 += Math.abs(brr[i] - arr[i]);
        }

        Arrays.sort(arr);
        Arrays.sort(brr);
        long ans2 = k;

        for(int i = 0; i < n; i ++) {
            ans2 += Math.abs(brr[i] - arr[i]);
        }

        return Math.min(ans1, ans2);
    }
}
```