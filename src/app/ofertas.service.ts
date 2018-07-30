import { Http, Response } from '@angular/http'
import { Oferta } from './shared/oferta.model'
import { Injectable } from '@angular/core';

import { URL_API, URL_COMO_USAR, URL_ONDE_FICA} from './app.api'
import { Observable } from 'rxjs'
import { map, retry } from 'rxjs/operators'

@Injectable()
export class OfertasService {

  //private url_api = 'http://localhost:3000/ofertas'

  constructor(private http: Http){}

  public getOfertas(): Promise<Oferta[]> {
    // efetuar uma requisição http
    return this.http.get(`${URL_API}?destaque=true`)
        .toPromise()
        .then((resposta: Response)=> resposta.json())
      //retornar uma promise Oferta[]
  }

  public getOfertasPorCategoria(categoria: string) : Promise<Oferta[]> {
    return this.http.get(`${URL_API}?categoria=${categoria}`)
      .toPromise()
      .then((resposta: Response) => resposta.json())
  }

  public getOfertasDiversao(categoria: string) : Promise<Oferta[]> {
    return this.http.get(`${URL_API}?categoria=${categoria}`)
               .toPromise()
               .then((resposta: Response) => resposta.json())
  }

  public getOfertasPorId(id: number): Promise<Oferta> {
    return this.http.get(`${URL_API}?id=${id}`)
               .toPromise()
               .then((resposta: Response) => {
                 return resposta.json()[0]
               })
  }

  public getComoUsarOfertaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_COMO_USAR}?id=${id}`)
        .toPromise()
        .then((resposta: Response) => {
          return resposta.json()[0].descricao
        })
  }

  public getOndeFicaPorId(id: number): Promise<string> {
    return this.http.get(`${URL_ONDE_FICA}?id=${id}`)
      .toPromise()
      .then((resposta: Response) => {
        return resposta.json()[0].descricao
      })
  }

  public pesquisaOfertas(termo: string): Observable<Oferta[]> {
    return this.http.get(`${URL_API}?descricao_oferta_like=${termo}`)
      .pipe(retry(10))
      .pipe(map((resposta: Response) => resposta.json()))
  }




  /*public getOfertas2(): Promise<Oferta[]> {
    return new Promise((resolve, reject) => {
      //algum tipo de processamento, que ao finalizar, chama a função resolve ou reject
      //console.log('será que passou por aqui')
      let deu_certo = true
      if(deu_certo) {
        setTimeout(() => resolve( this.ofertas ), 5000)
        
      } else {
        reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado toma bonito'})
      }
    })
    .then(( ofertas: Oferta[])=> {
      //fazer alguma tratativa
      console.log('primeiro then')
      return ofertas
    })
    /*.then((ofertas: Oferta[]) => {
      console.log('segundo then')
      return new Promise((resolve2, reject2) => {
        setTimeout(() => { reject2( ofertas )}, 3000)
      })
      })
      .then(( ofertas: Oferta[] ) => {
        console.log('terceiro then executado após 3 segundos porque estava esperando uma Promise')
        return ofertas
      })
}*/
}
