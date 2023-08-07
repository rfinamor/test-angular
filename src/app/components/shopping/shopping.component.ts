import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { Component, Input, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-main',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss'],
  providers: []
})
export class Shopping {
  dataSource: Product[];
  activeProduct: Product;
  dataSourceFiltered: Product[];
  dataPaginated: Product[];
  dataFilter: any;
  loading: boolean = false;
  displayedColumns: string[] = ['id', 'title', 'category', 'price','actions'];
  categoryFilter: string;
  pageSizeOptions: number[] = [20, 15, 10, 5];
  pagination: number;
  modalRef: NgbModalRef | undefined;



  constructor(private storeService: StoreService, private modalService: NgbModal) {
    this.dataSource = [];
    this.activeProduct = {};
    this.dataSourceFiltered = [];
    this.dataPaginated = [];
    this.categoryFilter = 'All';
    const [first] = this.pageSizeOptions;
    this.pagination = first;
  }

  ngOnInit(){
      this.getProducts();
  }

  open(content: TemplateRef<Shopping>, element: any): void {
		this.modalRef = this.modalService.open(content);
    this.activeProduct = element;
	  }

  public changeFilter(){
    if(this.categoryFilter === 'All'){
      this.dataSourceFiltered = this.dataSource;
    } else {
      this.dataSourceFiltered = this.dataSource.filter( x => x.category === this.categoryFilter);
    }
    this.dataPaginated = this.dataSourceFiltered;
    this.dataSourceFiltered = this.dataPaginated.slice(0, this.pagination);
  }

  public changePagination(){
    this.dataSourceFiltered = this.dataSource;
    this.dataSourceFiltered = this.dataPaginated.slice(0, this.pagination);
  }

  private getProducts(){
      this.storeService.getProducts().subscribe((response: { subscribe: (arg0: (products: any) => void) => void; }) => {
        response.subscribe((products) => {
          this.dataSource = products;
          this.dataSourceFiltered = products;
          this.dataPaginated = this.dataSourceFiltered;
          this.dataFilter = [...new Set(this.dataSource.map( x => x.category))];
          this.dataFilter.push('All');
        })
      });
  }
}


