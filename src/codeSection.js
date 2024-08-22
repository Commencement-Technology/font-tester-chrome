import { useMemo, useRef } from "react"

import { CopyOutlined } from "@ant-design/icons"

import { message } from "antd"

/**
 * Formats literal strings, removes extra spaces, preserves tab spaces \t and new lines \n
 */
function formatCodeString(code) {
    return code.split('\n').map(line => line.replace(/^[ ]+|[ ]+$/g,'')).join('\n')
}

/**
 * 
 * @param {{font: string, category: string, type: "import"|"link"}} param0 
 * @returns 
 */
function CodeSection({font="", category="", type="import"}){

    const codeRef = useRef()

    const codeString = useMemo(() => {
        
        const fontFamily = `"${font}", ${category === "display"? "system-ui": category}`
        const fontURL = `https://fonts.googleapis.com/css2?family=${font.replace(/ /g, "+")}`

        if (type === "import"){
            return `<style>
                        \t@import url('${fontURL}');

                        \t.${font.toLowerCase().replace(/ /g, "-")}-family{
                            \t\tfont-family: ${fontFamily};
                        \t}
                    </style>
                    `
        }else if(type === "link"){
            return `<link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="${fontURL}" rel="stylesheet">

                    <style>

                        \t.${font.toLowerCase().replace(/ /g, "-")}-family{
                            \t\tfont-family: ${fontFamily};
                        \t}
                    </style>
                    `
        }

    }, [type, font, category])

    const onCopy = () => {
        navigator.clipboard.writeText(codeRef.current?.innerText).then(function() {
            message.success("Copied to clipboard")
    
        }, function(err) {
            message.error("Error copying to clipboard")
        })
    }

    return (
        <div className="tw-rounded-md tw-relative tw-p-1 tw-bg-gray-100 tw-text-wrap tw-overflow-y-auto 
                        tw-h-[150px] tw-w-full">
            <div className="tw-sticky tw-left-0 tw-top-2 tw-w-full tw-flex tw-place-content-end">
                <button onClick={onCopy} className="hover:!tw-bg-gray-300 hover:!tw-color-black" 

								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
                    <CopyOutlined />
                </button>
            </div>
            
            <div className="tw-whitespace-break-spaces tw-w-full tw-h-fit tw-text-gray-700" ref={codeRef}>
                {font && formatCodeString(codeString)}
            </div>
        </div>
    )
}

export default CodeSection