import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: [
  ]
})
export class GraficoDonaComponent {

  @Input() title: string = 'Sin titulo';

/*   @Input() doughnutChartLabels: Label[] = [];
  @Input() doughnutChartData: MultiDataSet = [
    [],
    [],
    [],
  ];
  @Input() doughnutChartType: ChartType = 'doughnut'; */

  /*constructor() { }

  ngOnInit(): void {
  } */

  @Input('labels') doughnutChartLabels: Label[] = ['Label1', 'Label2', 'Label3'];
  @Input('datas') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public doughnutChartType: ChartType = 'doughnut';

  public colors: Color[] = [
    { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
  ];

}
