import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { TooltipHost } from '@fluentui/react';
import { IListViewerProps } from './IListViewerProps';
import { SPFI } from '@pnp/sp';
import { getSP } from '../../pnpjsConfig';
import { useEffect, useState } from 'react';
import { IADRAStaff } from '../../interfaces';

const classNames = mergeStyleSets({
  controlWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  selectionDetails: {
    marginBottom: '20px',
  },
});
const controlStyles = {
  root: {

    maxWidth: '300px',
  },
};

export interface IDetailsListDocumentsExampleState {
  columns: IColumn[];
  items: IADRAStaff[];
  selectionDetails: string;
  isModalSelection: boolean;
  isCompactMode: boolean;
  announcedMessage?: string;
}


export class ListViewer extends React.Component<IListViewerProps, IDetailsListDocumentsExampleState> {
  private _selection: Selection;
  private _allItems: IADRAStaff[];

  constructor(props: IListViewerProps | Readonly<IListViewerProps>) {
    super(props);

  this._allItems = [];

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'ADRAOffice',
            fieldName: 'ADRAOffice.Description',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column2',
            name: 'FirstName',
            fieldName: 'FirstName',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column3',
            name: 'LastName',
            fieldName: 'Title',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column4',
            name: 'JobTitle',
            fieldName: 'JobTitle',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column5',
            name: 'BusinessPhone',
            fieldName: 'BusinessPhone',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column6',
            name: 'EmailAddress',
            fieldName: 'EmailAddress',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column7',
            name: 'SkypeID',
            fieldName: 'SkypeID',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column8',
            name: 'Company',
            fieldName: 'Company',
            minWidth: 100,
            maxWidth: 220,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: this._onColumnClick,
            data: 'string',
            isPadded: true,
        },
    ];

    this._selection = new Selection({
      onSelectionChanged: () => {
        this.setState({
          selectionDetails: this._getSelectionDetails(),
        });
      },
    });

    this.state = {
      items: this._allItems,
      columns,
      selectionDetails: this._getSelectionDetails(),
      isModalSelection: false,
      isCompactMode: false,
      announcedMessage: undefined,
    };
    console.log(this.state.items);
  }
  
  componentDidMount(){
    _getLists(this.props).then(res=>this.setState({items:res}))
  }


  public render():React.ReactElement<IListViewerProps> {
    const { columns, isCompactMode, items, selectionDetails, isModalSelection, announcedMessage } = this.state;

    return (
      <div>
        <div className={classNames.controlWrapper}>
          <Toggle
            label="Enable compact mode"
            checked={isCompactMode}
            onChange={this._onChangeCompactMode}
            onText="Compact"
            offText="Normal"
            styles={controlStyles}
          />
          <Toggle
            label="Enable modal selection"
            checked={isModalSelection}
            onChange={this._onChangeModalSelection}
            onText="Modal"
            offText="Normal"
            styles={controlStyles}
          />
          <TextField label="Filter by name:" onChange={this._onChangeText} styles={controlStyles} />
          <Announced message={`Number of items after filter applied: ${items.length}.`} />
        </div>
        <div className={classNames.selectionDetails}>{selectionDetails}</div>
        <Announced message={selectionDetails} />
        {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
        {isModalSelection ? (
          <MarqueeSelection selection={this._selection}>
            <DetailsList
              items={items}
              compact={isCompactMode}
              columns={columns}
              selectionMode={SelectionMode.multiple}
              getKey={this._getKey}
              setKey="multiple"
              layoutMode={DetailsListLayoutMode.justified}
              isHeaderVisible={true}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              onItemInvoked={this._onItemInvoked}
              enterModalSelectionOnTouch={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="select row"
            />
          </MarqueeSelection>
        ) : (
          <DetailsList
            items={items}
            compact={isCompactMode}
            columns={columns}
            selectionMode={SelectionMode.none}
            getKey={this._getKey}
            setKey="none"
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
            onItemInvoked={this._onItemInvoked}
          />
        )}
      </div>
    );
  }

  public componentDidUpdate(previousProps: any, previousState: IDetailsListDocumentsExampleState) {
    if (previousState.isModalSelection !== this.state.isModalSelection && !this.state.isModalSelection) {
      this._selection.setAllSelected(false);
    }
  }

  private _getKey(item: any, index?: number): string {
    return item.key;
  }

  private _onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isCompactMode: checked });
  };

  private _onChangeModalSelection = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ isModalSelection: checked });
  };

  private _onChangeText = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this._allItems.filter(i => i.ADRAOffice.Description.toLowerCase().indexOf(text) > -1) : this._allItems,
    });
  };

  private _onItemInvoked(item: any): void {
    alert(`Item invoked: ${item.name}`);
  }

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return '1 item selected: ' + (this._selection.getSelection()[0] as IADRAStaff).ADRAOffice.Description;
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, items } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
        this.setState({
          announcedMessage: `${currColumn.name} is sorted ${
            currColumn.isSortedDescending ? 'descending' : 'ascending'
          }`,
        });
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = _copyAndSort(items, currColumn.fieldName!, currColumn.isSortedDescending);
    this.setState({
      columns: newColumns,
      items: newItems,
    });
  };
}

function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
  const key = columnKey as keyof T;
  return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
}
 

 async function _getLists(props: IListViewerProps){
    const LIST_NAME = 'ADRA Staff';

    const sp:SPFI=getSP(props.context);


    

    const itemsLists= await sp.web.lists.getByTitle(LIST_NAME).items.select().orderBy('ADRA_x0020_Office',true).orderBy('FirstName',true)();
    console.log('ADRAStaff Items',itemsLists);

   return itemsLists.map((item : IADRAStaff) => {
      return {
        Id: item.Id,
        ADRAOffice: item.ADRAOffice,
        FirstName: item.FirstName,
        LastName: item.LastName,
        JobTitle: item.JobTitle, 
        BusinessPhone: item.BusinessPhone,
        EmailAddress: item.EmailAddress,
        SkypeID: item.SkypeID,
        Company:item.Company
      }
    });

  }

