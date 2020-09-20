import React, { useEffect, useState } from "react";
import Editor from "./components/Editor";
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [html, setHtml] = useLocalStorage({key: 'html', initialValue: ''});
  const [css, setCss] = useLocalStorage({key: 'css', initialValue: ''});
  const [js, setJs] = useLocalStorage({key: 'js', initialValue: ''});
  const [srcDoc, setSrcDoc] = useState<string>('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Document</title>

          <style>${css}</style>
          
        </head>
        <body>
          ${html}

          <script>${js}</script>
        </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );;
}

export default App;
