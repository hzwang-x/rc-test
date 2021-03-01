import React from "react"
import Tree, { FilteringContainer } from 'react-virtualized-tree'
const EXPANDED = 'EXPANDED';
export const COLLAPSED_CHILDREN = {
  id: 3,
  name: 'Leaf 3',
  state: {
    expanded: false,
    favorite: true,
    deletable: true,
  },
  children: [
    {
      id: 'c-3',
      name: 'Leaf 3 Child',
      state: {},
    },
  ],
};

export const EXPANDED_CHILDREN = {
  id: 2,
  name: 'Leaf 2',
  state: {
    expanded: true,
    deletable: true,
  },
  children: [
    COLLAPSED_CHILDREN,
    {
      id: 4,
      name: 'Leaf 4',
    },
  ],
};

export const EXPANDED_NODE_IN_ROOT = {
  id: 0,
  name: 'Leaf 1',
  state: {
    expanded: true,
  },
  children: [
    EXPANDED_CHILDREN,
    {
      id: 5,
      name: 'Leaf 5',
    },
  ],
};

export const COLLAPSED_NODE_IN_ROOT = {
  id: 1,
  name: 'Leaf 6',
  state: {
    expanded: false,
    deletable: true,
  },
  children: [
    {
      id: 6,
      name: 'Leaf 7',
      state: {
        expanded: false,
      },
      children: [
        {
          id: 7,
          name: 'Leaf 8',
        },
        {
          id: 8,
          name: 'Leaf 9',
        },
      ],
    },
    {
      id: 9,
      name: 'Leaf 10',
    },
  ],
};

export const DELETABLE_IN_ROOT = {
  id: 'z',
  name: 'Leaf z',
  state: {
    deletable: true,
    favorite: true,
  },
};

export const DELETABLE_CHILDREN = EXPANDED_CHILDREN;

export const Nodes = [EXPANDED_NODE_IN_ROOT, COLLAPSED_NODE_IN_ROOT, DELETABLE_IN_ROOT];

class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: Nodes,
      // availableRenderers: [Expandable, Deletable, Favorite],
      selectedRenderers: [],
      groupsEnabled: true
    }
    this.arr = this.constructTree(4, 30, 5)

  }

  componentDidMount() {
    const arr = this.constructTree(4, 30, 5)
    console.log(arr)
  }

  get _groupProps() {
    return this.state.groupsEnabled
      ? {
          groups: {
            ALL: {
              name: 'All',
              filter: node => true,
            },
            [EXPANDED]: {
              name: 'Expanded',
              filter: node => (node.state || {}).expanded,
            },
            FAVORITES: {
              name: 'Favorites',
              filter: node => (node.state || {}).favorite,
            },
          },
          selectedGroup: this.state.selectedGroup,
          onSelectedGroupChange: this.handleSelectedGroupChange,
        }
      : {};
  }

  constructTree = (maxDeepness, maxNumberOfChildren, minNumOfNodes, deepness = 1) => {
    return new Array(minNumOfNodes).fill(deepness).map((si, i) => {
      const id = i;
      const numberOfChildren = deepness === maxDeepness ? 0 : Math.round(Math.random() * maxNumberOfChildren);
  
      return {
        id,
        name: `Leaf ${id}`,
        children: numberOfChildren ? this.constructTree(maxDeepness, maxNumberOfChildren, numberOfChildren, deepness + 1) : [],
        state: {
          expanded: numberOfChildren ? Boolean(Math.round(Math.random())) : false,
          favorite: Boolean(Math.round(Math.random())),
          deletable: Boolean(Math.round(Math.random())),
        },
      };
    });
  };

  handleChange = nodes => {
    debugger
    this.setState({nodes});
  };

  handleSelectedGroupChange = selectedGroup => {
    debugger
    this.setState({selectedGroup});
  };

  renderNodeDisplay = (display, props, children = []) => React.createElement(display, props, children);

  createNodeRenderer = (nodeDisplay = this.state.nodeDisplay, props) => {
    const [nextNode, ...remainingNodes] = nodeDisplay;

    if (remainingNodes.length === 0) {
      return this.renderNodeDisplay(nextNode, props);
    }

    return this.renderNodeDisplay(nextNode, props, this.createNodeRenderer(remainingNodes, props));
  };

  render () {
    console.log(this.state.nodes)
    return(
      <div>
        {/* <Tree
          nodes={this.state.nodes}
          onChange={this.handleChange}
        >
          {({style, ...p}) => <div style={style}>{this.createNodeRenderer(this.state.selectedRenderers, p)}</div>}
        </Tree> */}
        {/* <Tree nodes={this.arr} onChange={this.handleChange}>
          {({style, node, ...rest}) => (
            <div style={style}>
              123123
            </div>
          )}
        </Tree> */}
        <FilteringContainer nodes={this.arr} >
          {({nodes}) => {
            return  <div style={{height: 1000}}>
              <Tree nodes={nodes} onChange={this.handleChange}>
                {({style, node, ...rest}) => {
                  console.log(node)
                  // debugger
                  return <div style={style}>
                      {node.name}
                    </div>
                  
                }}
              </Tree>
            </div>
          }}
        </FilteringContainer>
      </div>
    )
  }
}

export default Demo