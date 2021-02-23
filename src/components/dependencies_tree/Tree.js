import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import D3_Tree from 'components/dependencies_tree/D3_Tree';

import OpenFiscaAPI from 'services/openfisca_api';

export default function Tree(props) {
  let { variable_name } = useParams();
  const { entities, variables } = props;

  const [variable, setVariable] = useState({});
  const [dependencyTree, setDependencyTree] = useState({});

  const createDependenciesPayload = (variable, entity) => {
    var payload = {
      persons: {
        'person 1': {},
      },
    };
    payload[entity.plural] = {};
    payload[entity.plural][`${entity.description} abcd`] = {};
    payload[entity.plural][`${entity.description} abcd`][variable.id] = { '2021-5-5': null };

    return payload;
  };

  function makeDependencyTree(trace) {
    const inputArray = Object.entries(trace).map((e) => ({ name: e[0], ...e[1] }));
    var baseNode = inputArray[0];

    // Recursively build a nested tree structure starting from the baseNode
    function buildNestedTreeFromNode(inputNode) {
      let return_obj;
      if (!inputNode.dependencies || inputNode.dependencies.length === 0) {
        return_obj = { ...inputNode, children: [] };
      }

      return_obj = {
        ...inputNode,
        children: inputArray
          .filter((item) => inputNode.dependencies.includes(item.name))
          .map((childNode) => buildNestedTreeFromNode(childNode)),
      };

      return return_obj;
    }

    return buildNestedTreeFromNode(baseNode);
  }

  useEffect(() => {
    OpenFiscaAPI.getVariable(variable_name)
      .then((res) => {
        setVariable(res.data);

        const entity_name = res.data.entity;
        const entity = entities[entity_name];

        return Promise.resolve({ variable: res.data, entity: entity });
      })
      .then((res) => {
        const payload = createDependenciesPayload(res.variable, res.entity);

        OpenFiscaAPI.postTrace(payload)
          .then((res) => {
            const depTree = makeDependencyTree(res.data.trace);
            setDependencyTree(depTree);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [entities]);

  return (
    <div>
      <table style={{ marginTop: 40, marginBottom: 40 }}>
        <tbody>
          <tr>
            <td style={{ fontWeight: 600 }}>id:</td>
            <td>{variable.id}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>description:</td>
            <td>{variable.description}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>type:</td>
            <td>{variable.valueType}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>default:</td>
            <td>{JSON.stringify(variable.defaultValue)}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>entity:</td>
            <td>{variable.entity}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>source:</td>
            <td>...github source link here</td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600 }}>formula:</td>
            {/* <td>{JSON.stringify(variable.formulas)}</td> */}
            <td>...formula block here</td>
          </tr>
        </tbody>
      </table>

      <div id="treeWrapper" style={{ width: '100vw', height: '50vw', backgroundColor: '#fff' }}>
        <D3_Tree data={dependencyTree} />
      </div>
    </div>
  );
}
