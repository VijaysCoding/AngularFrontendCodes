import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { DataService, Tree } from './data.service';

const TREE_DATA: Tree[] = [];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tree-Table-Task';
  displayedColumns: string[] = [
    'name',
    'count',
    'createdOn',
    'createdBy',
    'currency',
  ];

  private transformer = (node: Tree, level: number) => {
    return {
      expandable: !!node.childOfMainBranch && node.childOfMainBranch.length > 0,
      name: node.mainbranch,
      count: node.count,
      createdOn: node.createdOn,
      createdBy: node.createdBy,
      currency: node.currency,
      level: level,
    };
  };

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    (node) => node.level,
    (node) => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    (node) => node.level,
    (node) => node.expandable,
    (node) => node.childOfMainBranch
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private details: DataService) {
    this.details.GetData().subscribe(TREE_DATA=> {
          this.dataSource.data = TREE_DATA;
          console.log(this.dataSource);
    })
    // this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
