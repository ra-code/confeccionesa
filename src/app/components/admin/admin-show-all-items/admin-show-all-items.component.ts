import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import {MatPaginator, MatTableDataSource, MatSnackBar} from '@angular/material';
import {Router } from '@angular/router';

@Component({
  selector: 'app-admin-show-all-items',
  templateUrl: './admin-show-all-items.component.html',
  styleUrls: ['./admin-show-all-items.component.css']
})
export class AdminShowAllItemsComponent implements OnInit {
  res: any;
  items: any;

  // dataSource: object;
  public pageTitle: string = 'Artículos';
  public pageSubtitle: string = 'Mostar todos';

  constructor(private itemsService: ItemsService,public snackBar: MatSnackBar, public router:Router) { }
  displayedColumns = ['code', 'title', 'price', 'id_category','actions'];
  dataSource = new MatTableDataSource(this.items);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  deleteItem(a) {
    var items = this.items
    console.log(a)
    this.itemsService.deleteItem(a)
      .subscribe((data) => {
        this.res = data;
        console.log(this.res)
        if (this.res.err) {
          this.snackBar.open(this.res.err, 'X', {
            duration: 4000
          })
        } else {
          this.items = data;
          this.dataSource = new MatTableDataSource(this.items);
          this.dataSource.paginator = this.paginator;
           this.snackBar.open('Artículo eliminado', 'X', {
            duration: 4000
          })

        }

      },(error)=>{
        console.log(error)
      })
  }
  editElement(id){
    
    this.router.navigate(['/admin/editItem',id]);
  }
  ngOnInit() {

    this.itemsService.showAll()
      .subscribe(data => {
        this.items = data
        console.log(this.items)
        this.dataSource = new MatTableDataSource(this.items);
        this.dataSource.paginator = this.paginator;
        // this.dataSource = this.items;
        
      })
    //   this.itemService.newItem(data)
    //     .subscribe(data => {
    //       this.res = data,
    //         console.log(this.res)
    //       window.alert("Post subido con exito")

    //     })
    
  }




}
