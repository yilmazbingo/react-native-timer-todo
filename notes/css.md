## flex

<‘flex-grow’> <‘flex-shrink’>? || <‘flex-basis’> ]

default 0 1 auto

The flex property specifies the components of a flexible length: the flex factors (grow and shrink) and the flex basis. When a box is a flex item, flex is consulted instead of the main size property to determine the main size of the box. If a box is not a flex item, flex has no effect

-flex-grow will take the rest of the space. flex-grof:number number is the rate. imagine 3 boxes, their flex-grow respoectively 2 2 1.
-flex-shrink determines the rate of shrink. when we adjust the size of the screen, boxes will shrink at their shrink rate. Highest rate will shrink that box more. 
- if a box has min-width=200 px, it will not shrink any more, so as the page gets smaller, we will get horizontal scroll bar. `flex-wrap` is saying when boxes reach to the minimum, i want them to wrap in the next line. flex-wrap applies to the CONTAINER. 

- flex-basis is like min-widt if the flex-direction is set to be row, otherwise min-height. initial main size. "flex-basis" applies only to the flex items. 