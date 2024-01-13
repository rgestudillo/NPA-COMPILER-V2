import React, { useEffect, useState, useRef } from 'react';
import * as go from 'gojs';

const ParseTreeDiagram: React.FC = () => {
  const [codeToParse, setCodeToParse] = useState('');
  const [parseTrigger, setParseTrigger] = useState(false);
  const diagramRef = useRef<go.Diagram | null>(null);
  const [answer, setAnswer] = useState('Time Complexity Calculator')
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeToParse(e.target.value);
  };

  const handleParseButtonClick = async () => {
    setParseTrigger(true);

    try {
      const response = await fetch('http://backend.debmac.tech:5000/parse-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: codeToParse }),
      });

      const parsedRoot = await response.json();

      if (diagramRef.current) {
        const myDiagram = diagramRef.current;

        // Assuming parsedRoot contains the data structure compatible with your diagram
        // You might need to adjust this part based on the structure of parsedRoot
        myDiagram.model = new go.TreeModel(parsedRoot);
        setAnswer(parsedRoot[0].count);
        console.log('Diagram updated!');
      }

    } catch (error) {
      console.error('Error parsing code:', error);
      setAnswer("Parsing Failed!");
      // Handle error if needed
    } finally {
      setParseTrigger(false);
    }
  };

  useEffect(() => {
    if (!diagramRef.current) {
      const $$ = go.GraphObject.make;
      diagramRef.current = $$(go.Diagram, 'myDiagramDiv', {
        allowCopy: false,
        allowDelete: false,
        allowMove: false,
        initialAutoScale: go.Diagram.Uniform,
        layout: $$(go.TreeLayout, {
          angle: 90,
          compaction: go.TreeLayout.CompactionNone,
          arrangement: go.TreeLayout.ArrangementFixedRoots,
        }),
        'undoManager.isEnabled': true,
      });

      const formatTooltip = (nodeData: any) => `Count: ${nodeData.count}`;
      diagramRef.current.nodeTemplate = $$(go.Node, 'Vertical', { selectionObjectName: 'BODY' },
        $$(go.Panel, 'Auto', { name: 'BODY' },
          $$(go.Shape, 'RoundedRectangle',
            new go.Binding('fill'),
            new go.Binding('stroke')),
          $$(go.TextBlock,
            {
              font: 'bold 12pt Arial, sans-serif',
              margin: new go.Margin(4, 2, 2, 2),
              toolTip: $$(go.Adornment, 'Auto',
                $$(go.Shape, { fill: 'lightyellow' }),
                $$(go.TextBlock, { margin: 4 }, new go.Binding('text', '', formatTooltip))
              ),
            },
            new go.Binding('text'))
        ),
        $$(go.Panel,
          { height: 17 },
          'TreeExpanderButton'
        )
      );

      diagramRef.current.linkTemplate = $$(go.Link,
        $$(go.Shape, { strokeWidth: 1.5 })
      );
    }
  }, []);

  useEffect(() => {
    if (parseTrigger && codeToParse && diagramRef.current) {
      // Don't need to do anything here, as the diagram will be updated in handleParseButtonClick
    }
  }, [parseTrigger, codeToParse]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-center items-center text-2xl font-bold mt-2'>
        {answer}
      </div>
      <div className='text-white flex flex-row space-x-5 p-4'>
        <div className='flex-1'>
          <textarea
            className='w-full h-full bg-gray-100 text-black p-2 rounded'
            value={codeToParse}
            onChange={handleInputChange}
            placeholder='Enter your code here...'
          />
          <button
            onClick={handleParseButtonClick}
            className='mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300'
          >
            Parse Code
          </button>
        </div>
        <div className='w-1/2 bg-white h-[73vh]'>
          <div id='myDiagramDiv' className='w-full h-full'></div>
        </div>
      </div>
    </div>

  );
};

export default ParseTreeDiagram;
