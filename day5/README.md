# Learnings

- Wasted a lot of time because of a log bug. My parser regex had `(\d)` instead of `(\d+)`. This caused the double digit amount instructions, e.g. "move 11 ... " to fail.

