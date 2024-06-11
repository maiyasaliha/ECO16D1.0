import React, { useState } from 'react';
import Spreadsheet from "./components/Spreadsheet";
import ColourPicker from "./components/tools/BgColourPicker";
import FontColourPicker from './components/tools/FontColourPicker';
import ClearFormatting from './components/tools/ClearFormatting';
import BoldButton from './components/tools/BoldButton';
import ItalicButton from './components/tools/ItalicButton';
import SizeButton from './components/tools/SizeButton';
import UnderlineButton from './components/tools/UnderlineButton';
import StrikethroughButton from './components/tools/StrikethroughButton';
import FontPickerButton from './components/tools/FontPickerButton';
import TextAlignButton from './components/tools/TextAlignButton';
import CellFormatButton from './components/tools/CellFormatButton';
import MergeCellsButton from './components/tools/MergeCellsButton';
import MergeRowButton from './components/tools/MergeRowButton';

function App() {
    const [selectedCell, setSelectedCell] = useState(null);
    const [bgcolor, setBgColor] = useState('#ffffff');
    const [color, setColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('Arial');
    const [italic, setItalic] = useState("normal");
    const [bold, setBold] = useState("normal");
    const [underline, setUnderline] = useState(false);
    const [strikeThrough, setStrikeThrough] = useState('none');
    const [clear, setClear] = useState(false);
    const [b, setB] = useState(0);
    const [bg, setBg] = useState(0);
    const [fc, setFc] = useState(0);
    const [i, setI] = useState(0);
    const [s, setS] = useState(0);
    const [u, setU] = useState(0);
    const [a, setA] = useState(0);
    const [f, setF] = useState(0);
    const [e, setE] = useState(0);
    const [z, setZ] = useState(0);
    const [m, setM] = useState(0);
    const [mr, setMr] = useState(0);
    const [fontSize, setFontSize] = useState(14);
    const [textAlign, setTextAlign] = useState('left');
    const [format, setFormat] = useState('text');
    const [merge, setMerge] = useState(false);
    const [mergeRow, setMergeRow] = useState(false);
    const [editor, setEditor] = useState(false);

    return (
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', 
          justifyContent: 'space-evenly', margin: '20px', alignItems: 'center', 
          backgroundColor: '#e5f3fd', paddingRight: '30px', borderRadius: '30px', width: '90%', alignSelf: 'center'}}>
            <FontPickerButton 
                selectedCell={selectedCell}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
            />
            <SizeButton 
                selectedCell={selectedCell}
                fontSize={fontSize}
                setFontSize={setFontSize}
                setZ={setZ}
            />
            <ColourPicker 
                selectedCell={selectedCell} 
                color={bgcolor} 
                setColor={setBgColor}
                setBg={setBg}
            />
            <FontColourPicker
                selectedCell={selectedCell} 
                color={color} 
                setColor={setColor}
                setFc={setFc}
            />
            <ClearFormatting 
                selectedCell={selectedCell}
                setClear={setClear}
            />
            <BoldButton 
                selectedCell={selectedCell}
                setBold={setBold}
                setB={setB}
            />
            <ItalicButton 
                selectedCell={selectedCell}
                setItalic={setItalic}
                setI={setI}
            />
            <UnderlineButton 
                selectedCell={selectedCell}
                setUnderline={setUnderline}
                setU={setU}
            />
            <StrikethroughButton 
                selectedCell={selectedCell}
                setStrikeThrough={setStrikeThrough}
                setS={setS}
            />
            <TextAlignButton 
                selectedCell={selectedCell}
                setTextAlign={setTextAlign}
                a={a}
                setA={setA}
            />
            <MergeCellsButton
                selectedCell={selectedCell}
                setM={setM}
                setMerge={setMerge}
            />
            <MergeRowButton 
                selectedCell={selectedCell}
                setMr={setMr}
                setMergeRow={setMergeRow}
            />
            <CellFormatButton 
                selectedCell={selectedCell}
                setFormat={setFormat}
                setF={setF}
                setEditor={setEditor}
                setE={setE}
            />
          </div>
            <Spreadsheet 
                selectedCell={selectedCell} 
                setSelectedCell={setSelectedCell} 
                bgcolor={bgcolor} 
                color={color} 
                clear={clear}
                setClear={setClear}
                bold={bold}
                b={b}
                italic={italic}
                i={i}
                underline={underline}
                u={u}
                strikeThrough={strikeThrough}
                s={s}
                fontFamily={fontFamily}
                fontSize={fontSize}
                setFontSize={setFontSize}
                textAlign={textAlign}
                a={a}
                format={format}
                f={f}
                editor={editor}
                e={e}
                z={z}
                m={m}
                merge={merge}
                mr={mr}
                mergeRow={mergeRow}
                fc={fc}
                bg={bg}
            />
            
        </div>
    );
}

export default App;
