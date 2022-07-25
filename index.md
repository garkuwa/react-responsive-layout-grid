Simple 🍊. Reliable 🔐. Lightweight 🥇. Pure ReactJs + Styled Components.

[React Responsive Layout Grid Codesandbox link](https://codesandbox.io/s/typescript-styled-components-playground-forked-9qg3vc)

### Installation

_npm_
`npm i @garkuwa/react-responsive-layout-grid`

_yarn_
`yarn add @garkuwa/react-responsive-layout-grid`

If needed, call `initResponsiveLayoutGrid` to override default configs:

    initResponsiveLayoutGrid(
        {
        maxColumns: ...,
        spacingBase: ...,
        smBreakpoint: ...,
        mdBreakpoint: ...,
        lgBreakpoint: ...,
        xlgBreakpoint: ...,
        }
    );

### The issues grid layout is trying to solve👇

Often times, a team working on the project produces pages with inconsistent css styles, which is related to the fact that different developers might tackle a similar layout problem with different approaches. For example, to solve a typical task of building a one-dimensional few-block layout, some would use Flexbox while others would go with percentages or even viewport units. Additionally, at many places in code, pieces of duplicated css might accumulate and all these things would make the project styles cumbersome, glitchy, hard to read, extend and maintain. The key purpose of React Responsive Layout Grid is to standardize the way flex layouts are created with minimum afford and React-like style. It also makes the css styles more reliable in terms of responsiveness because the same approach is used on different pages.

### Inspiration

The development of React Responsive Layout Grid was inspired by [Material UI Grid](https://mui.com/components/grid/), which has similar functionality but lacks a few useful features and comes with an unjustifiably large package size. On top of a [huge size of the Material UI library](https://bundlephobia.com/package/@mui/material@5.9.1), it adds negative margins to containers and lacks some handy features, which are explained below. However, if you still like the Material UI website, you might use their website to get your head around React Responsive Layout Grid as it works very similarly.

### Basic Concepts

1. A page is divided into N equally sized columns, and as many rows as a user needs. The variable N can be configured via init argument `maxColumns`. The default value of `maxColumns` is 12.
2. A user can specify spacing between columns and rows in the grid using the `spacing` property, which uses relative units (pixels) behind the scene. One unit of spacing is equal to the `spacingBase` init argument. The default value of `spacingBase` is 8px.
3. React Responsive Grid uses [CSS Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and doesn't use sizes in percentage.
4. React Responsive Grid uses four CSS breakpoints to achieve responsiveness. The values of the breakpoints are fully configurable via the init method arguments:

| Breakpoint    | Init argument | Default value |
| ------------- | :-----------: | ------------: |
| sm (small)    | smBreakpoint  |          480x |
| cmd (medium)  | mdBreakpoint  |         767px |
| lg (large)    | lgBreakpoint  |        1024px |
| xlg (x-large) | xlgBreakpoint |        1200px |

### How React Responsive Layout Grid works under the hood

The whole idea is to divide a page into N (usually 12) equally sized columns called grid items inside a grid container, and allow a user to specify a number of columns that is needed and their sizes.

There is also an opportunity to specify spacing between grid items inside a container, and these are equal for every item inside the container. Technically, spacing is achieved with the [flexbox-gap feature](https://coryrylan.com/blog/css-gap-space-with-flexbox), which is different to CSS grid gap because the latter doesn't account for the fact that by adding spacing, items' width should be reduced to make them stay in the same row. To solve this problem, we have to calculate the factual item's width by subtracting the amount of spacing. All these calculations are done automatically.

Overall, a grid container is nothing else but a flexbox container while a grid item is a flexbox item. So, every time you make up your mind to use React Responsive Layout Grid please ask yourself a question: how would I do it with simple CSS Flexbox?

### Breakpoints

On every grid item, you can use one, a few, all or neither of these breakpoints. If you specify a value for a single breakpoint, the grid layout would automatically use that value for other breakpoints. This is handy in case you want to use the same value for different breakpoints and don't want to specify the same number a few times.

**React Responsive Layout Grid reads breakpoints from left to right**, which means that if you've mentioned a small breakpoint (`sm`) and a large breakpoint (`lg`), the value of a medium breakpoint (`md`) would implicitly be the same as `sm` and the value of the x-large breakpoint (`x-lg`) would be the same as `lg`. For example:
`<GridItem sm={2} lg={5}> </GridItem>` would result in 2 being used for `sm` and `md` and `5` being used for `lg` and `xlg`. Please take into account, that the value of a breakpoint doesn't have to be a number, and it can be a boolean value. Check out the chapter about "Breakpoint values" for more information👇.

### Breakpoint values

A breakpoint value can be a boolean, number or undefined (a default one). Each serves a different purpose.

For the sake of simplicity, we'll assume that `maxColumns` is 12 in the examples below.

The most usual one is a numeric value, which simply says use N columns out of 12 for that breakpoint. For example, `<GridItem md={4}/>`.

If `true` is used as a breakpoint value (`<GridItem md={true}/>` or simply `<GridItem md/>`), that column would take all the remaining space in a row. For example,
`<GridItem md={4}/>`
`<GridItem md/>` would result in two columns in a row with 33% occupied by the former one ( 100% / 12 \* 4) and the remaining 66% taken by the latter. You might also use `false` as a breakpoint value and it'd make a grid item take as much space as its content requires (aka auto-sizing). It's somewhat similar to passing `undefined` as a value, but using `false` also helps to set an auto-size value for the breakpoint that is between numeric or `true` values. Please keep reading to understand this.

If `undefined` is used as a breakpoint value (`<GridItem md={undefined}/>` or simply `<GridItem/>`), the grid item becomes autos-sized on that breakpoint. In other words, if "Some text" is the content of a grid item (`<GridItem>Some text</GridItem>`), the grid item's width would be equal to the width of `Some text`. Sometimes, you might want to use an auto-sized width only for a certain breakpoint while other breakpoints have numeric values. To achieve this, you can use `false` as a value for that specific breakpoint. For example, `<GridItem sm={4} md={false} lg={4}/>` means that on `sm` and `lg` devices, the grid item would take 33% (100 / 12 \* 4) while on `md` ones, it'd be auto-sized.

### Grid Container

As mentioned above, a grid container is nothing else but a flexbox container. It has almost all the properties that a usual flexbox container would have plus spacing between items, a container's margins and paddings. For example,
`<GridContainer flexDirection="column" justifyContent="flex-end" spacing={1}> m={2} p={3} pt={1}>`
`<GridItem> Some content </GridItem> `
`<GridContainer>` where `m` stands for CSS `margin`, `p` for `padding` and `pt` for `padding-top` (`mt` for `margin-top`, `pl` for `padding-left` etc.)
In the example below, `p` and `pt` are used together, which means that `padding-left`, `padding-right`, `padding-bottom` would be 3 units while `padding-top` would be overridden to 1 unit.

**As for units that are used for `spacing`, `m` and `p` properties, these are relative units where 1 equals to 8 pixels or value set by the `spacingBase` init property.**

Also, you can force a grid container to take a certain width and height by applying the `containerWidth` and `containerHeight` props. The boolean `fullWidth` prop would set a container's width to 100%.

Please take into account, that GridContainer has some default values of properties which are used if a user doesn't specify different ones. While they are usually the same as CSS flexbox uses, **it's important to mention that the default value of `flexWrap` is `wrap`.** Please check out the table below for more info about default properties.

Grid Container props (all are optional):

| Prop            | Default value |
| --------------- | :-----------: |
| fullHeight      |     false     |
| containerHeight |    'unset'    |
| containerWidth  |    'unset'    |
| justifyContent  | 'flex-start'  |
| alignItems      |   'stretch'   |
| spacing         |               |
| flexWrap        |    'wrap'     |
| flexDirection   |     'row'     |
| m               |               |
| ml              |               |
| mt              |               |
| mr              |               |
| mb              |               |
| p               |               |
| pl              |               |
| pt              |               |
| pr              |               |
| pb              |               |

### Grid Item

As mentioned above, a grid container is nothing else but a flexbox item. **It's worth mentioning that you don't have to wrap every single item into `<GridItem>`** It's necessary to do so only if properties, such as breakpoints (`sm`, `md`, `lg`, `xlg`), paddings (`p`, `pt`, `pr`, `pb`, `pl`) are needed. Otherwise, a grid item can be substituted for any HTML tag, and in this case, this item would be auto-sized, which is the behavior of CSS Flexbox. Please feel free to play with examples provided in the example section to gain a better understanding of grid items. **A grid item at the moment doesn't offer margin properties (`m`, `mt`, `mr`, `mb`, `ml`) but it has all the padding properties (`p`, `pt`, `pr`, `pb`, `pl`).**

**Grid items can be containers for other items**. To do so, please simply put a grid container inside a grid item or use the more concise syntax that is showcased in the `Adding custom css properties` section.

Grid Item props are a combination of breakpoints (`sm`, `md`, `lg`, `xlg`) and paddings (`p`, `pl`, `pt`, `pr`, `pb`). All are optional.

### Centered Container

It does what it says: centers content using `maxWidth` prop. Additionally, all the padding properties are available (`p`, `pt`, `pr`, `pb`, `pl`). It's especially useful when we want to limit the width of a page on large monitors.

Centered Container props (all are optional):

| Prop     | Default value |
| -------- | :-----------: |
| maxWidth |     100%      |
| width    |     100%      |

### Adding custom css properties

It's common to add custom css properties (colors, shadows, borders etc.) to a grid container or items. Luckily, styled-components, the only dependency that is used in React Responsive Layout Grid, offers the `as` prop that allows us to [extend styled entities](https://styled-components.com/docs/basics#extending-styles). For example, here
`<GridItem sm={6} as={GridContainer} spacing={1} flexDirection="column" justifyContent="space-evenly" alignItems="center">`
the grid item extends the grid container, which means that the properties of both become available simultaneously. **This example demonstrates how we can convert a grid item into a grid container, so it can be a placeholder for nested items**.

### Examples (feel free to fork and play):

[React Responsive Layout Grid Codesandbox link](https://codesandbox.io/s/typescript-styled-components-playground-forked-9qg3vc)

The most informative might be the apple grid item `` in the second section (`Advanced usage`) where the most advanced breakpoint usage is demonstrated.

### Reporting bugs

If you find a certain use case where React Responsive Layout Grid doesn't behave as it should, feel free to report a bug with an example or open a pull request.

### License

The source code for the library is licensed under the MIT license.
