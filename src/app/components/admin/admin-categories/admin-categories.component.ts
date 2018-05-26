import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemsService } from '../../../services/items.service'
import { MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  res: any;
  categories: any;
  name: string;
  public pageTitle: string = 'Categorías';
  public pageSubtitle: string = 'Administrar categorias';
  displayedColumns = ['name', 'actions'];
  dataSource = new MatTableDataSource(this.categories);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private itemsService: ItemsService, public snackBar: MatSnackBar) { }


  ngOnInit() {
    this.itemsService.showCategories()
      .subscribe(data => {
        this.categories = data;
        this.dataSource = new MatTableDataSource(this.categories);
        this.dataSource.paginator = this.paginator;
      })
  }

  deleteCategorie(a) {
    var categories = this.categories
    this.itemsService.deleteCategorie(a)
      .subscribe(data => {
        this.res = data;
        console.log(this.res)
        if (this.res.err) {
          this.snackBar.open(this.res.err, 'X', {
            duration: 4000
          })
        } else {
          this.categories = data;
          this.dataSource = new MatTableDataSource(this.categories);
          this.dataSource.paginator = this.paginator;
           this.snackBar.open('Categoría eliminada', 'X', {
            duration: 4000
          })

        }

      })
  }
  newCategorie(event) {
    event.preventDefault();
    var data = {
      name: this.name
    }
    this.itemsService.newCategorie(data)
      .subscribe(data => {
      
        
          this.categories.push(data);
          this.dataSource = new MatTableDataSource(this.categories);
          this.dataSource.paginator = this.paginator;
  
        



      })
  }
}
