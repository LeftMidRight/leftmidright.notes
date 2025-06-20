---
title: LeetCode Contest 454
date: 2025-06-19
categories:
    - 算法比赛
comments: true
---  

>久违的一把周赛

>排名:552
<!-- more -->

# [T1.3582.为视频标题生成标签](https://leetcode.cn/problems/generate-tag-for-video-caption/description/)

一个模拟题，赛时考虑的情况不够导致我连续WA五次呜呜呜。首先要做的就是把这个字符串的单词分解出来，这个在Java中是比较好做的，用`trim()`方法可以把字符串中的前导空格给去掉，用`split()`方法配合正则表达式可以“以一个或多个空格作为分隔符”来分割字符串的目的。

得到每一个单词之后，开始拼接答案，第一个单词全部小写`toLowerCase()`，后面的单词第一个字母大写后面的小写`s.substring(0,1).toUpperCase() + s.substring(1).toLowerCase()`

```java
class Solution {
    public String generateTag(String caption) {
        String[] words = caption.trim().split("\\s+");

        StringBuilder sb = new StringBuilder();
        sb.append('#');

        for(int i = 0; i < words.length; i ++) {
            String word = words[i];
            if(i == 0) {
                sb.append(word.toLowerCase());
            } else {
                sb.append(word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase());
            }
        }
        
        String res = sb.toString();

        if(res.length() > 100) {
            res = res.substring(0, 100);
        }

        return res;
    }
}
```

# [T2.3583. 统计特殊三元组](https://leetcode.cn/problems/count-special-triplets/description/)

可以发现如果我们要求下标 i 可以组成几个特殊三元组，只要知道范围 [0, i - 1] 中值为 nums[i] * 2 的下标有多少个，和范围 [i + 1, nums.length - 1]就可以了。那么这件事是很容易办到的，我们只需要在计算答案之前，记录一下每个位置 i 的前缀和后缀中 num[i] * 2的出现次数，用两个数组 + 哈希表就可以办到，这是一种`前后缀分解`的思路。也可以两个哈希表办到。

```java
class Solution {
    private static final int MOD = 1_000_000_007;

    public int specialTriplets(int[] nums) {
        Map<Integer,Integer> suf = new HashMap<>();
        Map<Integer,Integer> pre = new HashMap<>();

        for(int x : nums) {
            suf.merge(x, 1, Integer::sum);
        }

        int ans = 0;

        for(int x : nums) {
            suf.merge(x, -1, Integer::sum);

            int get_pre = pre.get(2 * x) == null ? 0 : pre.get(2 * x);
            int get_suf = suf.get(2 * x) == null ? 0 : suf.get(2 * x);

            pre.merge(x, 1, Integer::sum);

            ans = (int)(((long)ans + (long)get_pre * get_suf % MOD) % MOD);

            //System.out.println(get_pre + " " + get_suf + " " + ans);
        }

        return ans;
    }
}
```

# [T3.3584. 子序列首尾元素的最大乘积](https://leetcode.cn/problems/maximum-product-of-first-and-last-elements-of-a-subsequence/description/)

对于数组中一组数的最大乘积这种问题，我们只需要判断当前数和之前累乘的数的**最大值和最小值**是多少，考虑最小值是因为当前数可能是负数，如果最小值也是负数，两数一乘也可能是最大值。

所以这题我们只需要一边乘一边记录当前位置之前的子序列的最大乘积和最小乘积就可以了，而在计算的时候，由于题目要求要返回任意大小为m的子序列，所以如果当前位置是 i，那么要取 i - m + 1 位置之前的最大乘积和最小乘积

```java
class Solution {
    public long maximumProduct(int[] nums, int m) {
        int n = nums.length;

        long ans = Long.MIN_VALUE;

        int[] maxCnt = new int[n];
        int[] minCnt=  new int[n];

        if(m == 1) {
            for(int i = 0; i < n; i ++) {
                ans = Math.max(ans, (long)nums[i] * nums[i]);
            } 
        } else {
            for(int i = 0; i < n; i ++) {
                if(i - m + 1 >= 0) {
                    ans = Math.max(ans, (long)nums[i] * maxCnt[i - m + 1]);
                    ans = Math.max(ans, (long)nums[i] * minCnt[i - m + 1]);
                }
                if(i == 0) {
                    maxCnt[i] = nums[i];
                    minCnt[i] = nums[i];
                } else {
                    maxCnt[i] = Math.max(maxCnt[i - 1], nums[i]);
                    minCnt[i] = Math.min(minCnt[i - 1], nums[i]);
                }
            }
        }
        

        return ans;
    }
}
```
