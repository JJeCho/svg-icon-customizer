"use client";
import React, { useState } from "react";
import { parse, stringify, type INode } from "svgson";

const IconCustomizer: React.FC = () => {
  const [svgJson, setSvgJson] = useState<INode | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [colorPickerValue, setColorPickerValue] = useState<string>("#000000");
  const [filename, setFilename] = useState<string>("custom-icon");

  const assignIds = (node: INode): void => {
    if (node.type === "element") {
      if (!node.attributes.id) {
        node.attributes.id = `id-${Math.random().toString(36).slice(2, 11)}`;
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => assignIds(child));
      }
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== "image/svg+xml") {
        alert("Please upload a valid SVG file.");
        return;
      }
      const content = await file.text();
      const sanitizedContent = sanitizeSVG(content);
      try {
        const json = (await parse(sanitizedContent)) as INode;
        assignIds(json);
        setSvgJson(json);
        setSelectedElementId(null); // Reset selection
      } catch (error) {
        alert("Failed to parse SVG file." + error);
      }
    }
  };

  const sanitizeSVG = (svg: string): string => {
    return svg.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
  };

  const handleElementClick = (
    e: React.MouseEvent<SVGElement>,
    id: string,
    fill: string | undefined
  ): void => {
    e.stopPropagation();
    setSelectedElementId(id);
    setColorPickerValue(fill || "#000000");
  };

  const findElementById = (node: INode, id: string): INode | null => {
    if (node.type === "element" && node.attributes.id === id) {
      return node;
    }
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const found = findElementById(child, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateElementFill = (id: string, newFill: string): void => {
    if (!svgJson) return;
    const newSvgJson = JSON.parse(JSON.stringify(svgJson)) as INode;
    const element = findElementById(newSvgJson, id);
    if (element) {
      element.attributes.fill = newFill;
      setSvgJson(newSvgJson);
    }
  };

  const handleColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newColor = e.target.value;
    setColorPickerValue(newColor);
    if (selectedElementId) {
      updateElementFill(selectedElementId, newColor);
    }
  };

  const convertAttributes = (
    attributes: { [key: string]: string }
  ): { [key: string]: string } => {
    const newAttributes: { [key: string]: string } = {};
    for (const key in attributes) {
      const camelCaseKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      newAttributes[camelCaseKey] = attributes[key];
    }
    return newAttributes;
  };

  const renderSvgElement = (node: INode): React.ReactElement | null => {
    if (node.type === "element") {
      const { name, attributes, children } = node;

      const isSelected = selectedElementId === attributes.id;

      const handleClick = (e: React.MouseEvent<SVGElement>) =>
        handleElementClick(e, attributes.id, attributes.fill);

      const style: React.CSSProperties = {
        outline: isSelected ? "2px solid red" : "none",
        cursor: "pointer",
      };

      const elementProps: React.SVGProps<SVGElement> = {
        ...convertAttributes(attributes),
        key: attributes.id,
        onClick: handleClick,
        style,
      };

      return React.createElement(
        name,
        elementProps,
        children && children.map((child) => renderSvgElement(child))
      );
    }
    return null;
  };

  const generateSvgString = (): string => {
    if (svgJson) {
      return stringify(svgJson);
    }
    return "";
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Customize Your SVG Icon</h2>

      <div className="mb-4">
        <input
          type="file"
          accept=".svg"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100"
        />
      </div>

      {svgJson && (
        <>
          <div className="mb-4">
            <label htmlFor="filename" className="block text-sm font-medium">
              Filename:
            </label>
            <input
              type="text"
              id="filename"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="mt-2 p-2 border rounded-md w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="color-picker" className="block text-sm font-medium">
              Pick Element Color:
            </label>
            <input
              type="color"
              id="color-picker"
              value={colorPickerValue}
              onChange={handleColorChange}
              className="mt-2"
              disabled={!selectedElementId}
            />
          </div>

          <div className="border p-4 rounded-md mb-4">
            <h3 className="text-lg font-semibold mb-2">
              Preview (Click elements to select)
            </h3>
            <div className="icon-preview">{renderSvgElement(svgJson)}</div>
          </div>

          <div className="flex justify-end">
            <a
              href={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(
                generateSvgString()
              )}`}
              download={`${filename || "custom-icon"}.svg`}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Download SVG
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default IconCustomizer;
