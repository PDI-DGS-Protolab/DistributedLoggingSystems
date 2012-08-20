package org.conwet.oil.fluentd.test;

import java.util.HashMap;
import java.util.Map;

import org.fluentd.logger.FluentLogger;

public class Main {

	/* Attributes */

	private FluentLogger LOG = FluentLogger.getLogger("app","192.168.1.64", 24224);


	/* Methods */

	public void doApplicationLogic() {
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("from", "userA");
		data.put("to", "userB");
		LOG.log("prueba", data);
	}

	public void test1(){
		for (int i = 0; i < 1000; i++) {
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("from", "Me");
			data.put("to", "Myself");
			data.put("Valor", i);
			LOG.log("prueba", data);
		}
	}

	public void test2(){
		Hilos[] h=new Hilos[2];
		h[0]=new Hilos(1);
		h[1]=new Hilos(2);
		h[0].start();
		h[1].start();
		try {
			h[0].join();
			h[1].join();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

	}

	public void test3(){
		Hilos h[]=new Hilos [1000];
		for (int i = 0; i < h.length; i++) {
			h[i]=new Hilos(i);
			h[i].start();
		}
		for (int i = 0; i < h.length; i++) {
			try {
				h[i].join();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}


	/* Main */

	public static void main(String[] args) {
		Main p = new Main();
		p.doApplicationLogic();
		p.test1();
		p.LOG.close();
		p.test2();
		p.test3();
		Hilos.cerrar();
	}

}
