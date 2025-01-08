---
title: LeetCode Contest 430
date: 2024-12-29
categories:
    - LeetCode周赛
comments: true
---

# LeetCode Contest 430

>读个书怎么这么多事啊，真复习不过来了卧槽

期末复习还能偷摸打一把。经典两题选手，我啥时候能上 knight 啊！
<!-- more -->

## T1  [3402.使每一列严格递增的最少操作次数](https://leetcode.cn/problems/minimum-operations-to-make-columns-strictly-increasing/description/)

每次固定一列，按行从上到下进行遍历，如果 $grid[i][j] > grid[i - 1][j]$ 就让 $grid[i][j]$ 自增一次，且记录的答案自增一次

```java
class Solution {
    public int minimumOperations(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;

        int ans = 0;
        
        for(int j = 0; j < m; j ++) {
            for(int i = 0; i < n; i ++) {
                while(i > 0 && grid[i][j] <= grid[i - 1][j]) {
                    ans ++;
                    grid[i][j] ++;
                }
            }
        }

        return ans;
    }
}
```

## T2 [3403. 从盒子中找出字典序最大的字符串 I](https://leetcode.cn/problems/find-the-lexicographically-largest-string-from-the-box-i/description/)


```java
class Solution {
    public String answerString(String word, int numFriends) {
        if(numFriends == 1) {
            return word;
        }
        int len = word.length() - numFriends + 1;
        String ans = "";
        
        for (int i = 0; i < n; i++) {
            String temp;
            if(i < n - len + 1) {
                temp = word.substring(i, i + len);
            } else {
                temp = word.substring(i, word.length());
            }

            if(temp.compareTo(ans) > 0) {
                ans = temp;
            }
        }
        return ans;
    }
}
```