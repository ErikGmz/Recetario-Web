import { Component, AfterViewInit, ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-grafica-favoritos',
  templateUrl: './grafica-favoritos.component.html',
  styleUrls: ['./grafica-favoritos.component.css']
})
export class GraficaFavoritosComponent implements AfterViewInit {
  @ViewChild("chart") grafico!: ChartComponent;
  @ViewChildren('contenedorGrafico') contenedorGrafico!: QueryList<ElementRef>;
  mostrarGrafico: boolean = false;
  opcionesGrafico: any;

  constructor(public autenticacion: AutenticacionService) {
  }

  ngAfterViewInit(): void {
    this.autenticacion.obtenerRecetas().subscribe((datos: any) => {
      let arregloFavoritos: number[] = []; 
      let arregloRecetas: string[] = [];
      datos.forEach((receta: any) => {
        arregloFavoritos.push(receta.cantidadFavoritos);
        arregloRecetas.push(receta.nombreReceta)
      });

      this.opcionesGrafico = {
        series: [
          {
            name: "No. favoritos",
            data: arregloFavoritos
          }
        ],
        chart: {
          height: "100%",
          type: "bar",
          toolbar: {
            show: false,
          }
        },
        title: {
          text: "No. de favoritos por receta",
          align: "center"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        xaxis: {
          categories: arregloRecetas,
          title: {
            text: "No. de favoritos"
          }
        },
        yaxis: {
          title: {
            text: "Recetas"
          }
        }
      };
      this.mostrarGrafico = true;

      this.contenedorGrafico.changes.subscribe(() => {
        this.opcionesGrafico.chart.height = (this.contenedorGrafico.toArray()[0].nativeElement.offsetHeight 
        + 50 * this.opcionesGrafico.series[0].data.length) + "px";
      })
    })
  }


}