import React from 'react';

const styles = {
  wrapper: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    overflow: 'hidden'
  },
  header: {
    padding: '1.5rem',
    borderBottom: '1px solid rgb(229 231 235)'
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: 'rgb(30 64 175)',
    margin: 0
  },
  content: {
    padding: '1.5rem'
  },
  svgContainer: {
    background: 'linear-gradient(180deg, rgb(239 246 255) 0%, rgb(255 255 255) 100%)',
    borderRadius: '0.5rem',
    padding: '1rem'
  },
  svg: {
    width: '100%',
    filter: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))'
  }
};

const factorTreeData = {
  root: {
    value: 360,
    left: {
      value: 2,
      right: null,
      left: null
    },
    right: {
      value: 180,
      left: {
        value: 2,
      },
      right: {
        value: 90,
        left: {
          value: 2
        },
        right: {
          value: 45,
          left: {
            value: 5
          },
          right: {
            value: 9,
            left: {
              value: 3
            },
            right: {
              value: 3,
            }
          }
        }
      }
    }
  }
};

const TreeNode = ({ node, x, y, level }) => {
  debugger
  if (!node) return null;

  // Adjusted spacing values
  const nodeSize = 36; // Slightly smaller nodes
  const horizontalSpacing = 20; // Reduced horizontal spacing
  const verticalSpacing = 50; // Reduced vertical spacing
  // Adjust the power base to reduce horizontal spread at each level
  const leftOffset = Math.pow(1.8, (3 - level)) * horizontalSpacing;

  const nodeStyles = {
    outerCircle: {
      fill: 'rgb(219 234 254)', // blue-100
    },
    innerCircle: {
      fill: 'white',
      stroke: 'rgb(59 130 246)', // blue-500
      strokeWidth: 2,
      transition: 'fill 0.3s ease',
      cursor: 'pointer'
    },
    innerCircleHover: {
      fill: 'rgb(239 246 255)' // blue-50
    },
    text: {
      fontSize: '0.875rem',
      fontWeight: 600,
      fill: 'rgb(29 78 216)', // blue-700
    },
    line: {
      stroke: 'rgb(147 197 253)', // blue-300
      strokeWidth: 2
    }
  };

  return (
    <>
      <g transform={`translate(${x},${y})`}>
        {/* Node outer circle (shadow effect) */}
        <circle 
          cx="0" 
          cy="0" 
          r={(nodeSize/2) + 2}
          style={nodeStyles.outerCircle}
        />
        {/* Main node circle */}
        <circle 
          cx="0" 
          cy="0" 
          r={nodeSize/2} 
          style={nodeStyles.innerCircle}
          onMouseOver={(e) => {
            e.target.style.fill = nodeStyles.innerCircleHover.fill;
          }}
          onMouseOut={(e) => {
            e.target.style.fill = nodeStyles.innerCircle.fill;
          }}
        />
        {/* Node value text */}
        <text 
          x="0" 
          y="0" 
          style={nodeStyles.text}
          textAnchor="middle" 
          dominantBaseline="middle"
        >
          {node.value}
        </text>
      </g>

      {/* Connection lines to children */}
      {node.left && (
        <>
          <line 
            x1={x} 
            y1={y} 
            x2={x - leftOffset} 
            y2={y + verticalSpacing}
            style={nodeStyles.line}
          />
          <TreeNode 
            node={node.left} 
            x={x - leftOffset} 
            y={y + verticalSpacing} 
            level={level + 1}
          />
        </>
      )}
      
      {node.right && (
        <>
          <line 
            x1={x} 
            y1={y} 
            x2={x + leftOffset} 
            y2={y + verticalSpacing}
            style={nodeStyles.line}
          />
          <TreeNode 
            node={node.right} 
            x={x + leftOffset} 
            y={y + verticalSpacing} 
            level={level + 1}
          />
        </>
      )}
    </>
  );
};

const FactorTree = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
      </div>
      <div style={styles.content}>
        <div style={styles.svgContainer}>
          <svg 
            viewBox="0 0 600 300" // Adjusted viewBox to better fit the new spacing
            style={styles.svg}
          >
            <g transform="translate(300, 30)">
              <TreeNode 
                node={factorTreeData.root} 
                x={0} 
                y={0} 
                level={0}
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FactorTree;