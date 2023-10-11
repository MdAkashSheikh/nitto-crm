
import React, { useState, useEffect } from "react";
import { TreeSelect } from 'primereact/treeselect';
import { Button } from 'primereact/button';
import { NodeService } from "./NodeService";

export default function ControlledDemo() {
    const [nodes, setNodes] = useState(null);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [expandedKeys, setExpandedKeys] = useState({});

    const expandAll = () => {
        let _expandedKeys = {};

        for (let node of nodes) {
            expandNode(node, _expandedKeys);
        }

        setExpandedKeys(_expandedKeys);
    };

    const collapseAll = () => {
        setExpandedKeys({});
    };

    const expandNode = (node, _expandedKeys) => {
        if (node.children && node.children.length) {
            _expandedKeys[node.key] = true;

            for (let child of node.children) {
                expandNode(child, _expandedKeys);
            }
        }
    };

    const headerTemplate = (
        <div className="p-3 pb-0">
            <Button type="button" icon="pi pi-plus" onClick={expandAll} className="w-2rem h-2rem mr-2 p-button-outlined" />
            <Button type="button" icon="pi pi-minus" onClick={collapseAll} className="w-2rem h-2rem p-button-outlined" />
        </div>
    );

    useEffect(() => {
        NodeService.getTreeNodes().then((data) => setNodes(data));
    }, []);

    return (
        <div className="card flex justify-content-center">
            <TreeSelect value={selectedNodeKey} onChange={(e) => setSelectedNodeKey(e.value)} options={nodes} 
                className="md:w-20rem w-full" placeholder="Select Item"
                expandedKeys={expandedKeys} onToggle={(e) => setExpandedKeys(e.value)} panelHeaderTemplate={headerTemplate}></TreeSelect>
        </div>
    );
}