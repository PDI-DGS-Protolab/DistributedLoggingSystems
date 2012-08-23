
import java.util.Random;
import org.apache.flume.EventDeliveryException;
import api.logger.Logger;

public class Test extends Thread{
	private int id;	
	
	public Test(int id){
		this.id=id;
	}
	
	public static void main(String[] args) {
		Test t[]= new Test[3];
		for (int i = 0; i < t.length; i++) {
			 t[i]=new Test(i+1);
			 t[i].start();
		}
		for (int i = 0; i < t.length; i++) {
			try {
				t[i].join();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	@Override
	public void run() {
		Logger l=new Logger();
		int c=l.addRpcDestiny("localhost", 55554);
		Random r=new Random();
		for (int i = 0; i < 10000; i++) {
			try {
				l.send(c,"Cliente "+ this.id + String.valueOf(r.nextInt(1000)));
			} catch (EventDeliveryException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
}