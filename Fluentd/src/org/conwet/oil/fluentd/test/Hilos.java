package org.conwet.oil.fluentd.test;

import java.util.HashMap;
import java.util.Map;

import org.fluentd.logger.FluentLogger;


public class Hilos extends Thread {

	/* Attributes */

	private int i;

	private static FluentLogger LOG = FluentLogger.getLogger("app", "192.168.1.64", 24224);


	/* Constructor */
	
	public Hilos(int n) {
		this.i = n;
	}

	
	/* Methods */

	public void run(){
		if (i%2 == 0)
			testa();
		else
			testb();
		return;
	}

	public void testa() {
		for (int i = 0; i < 100; i++) {
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("from", "Hilo " + this.i);
			data.put("to", "Myself");
			data.put("Valor", i);
			LOG.log("prueba", data);
		}
	}

	public void testb() {
		for (int i = 0; i < 150; i++) {
			Map<String, Object> data = new HashMap<String, Object>();
			data.put("from", "Hilo " + this.i);
			data.put("to", "Myself");
			data.put("Valor", i+10000);
			LOG.log("prueba", data);
		}
	}
	
	public static void cerrar(){
		LOG.close();
	}

}
