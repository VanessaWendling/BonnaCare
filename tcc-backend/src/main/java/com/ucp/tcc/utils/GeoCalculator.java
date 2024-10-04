package com.ucp.tcc.utils;

public class GeoCalculator {

	private static final double EARTH_RADIUS = 6371.0; // raio da terra

	public static double haversine(double lat1, double lon1, double lat2, double lon2) {

		// converte graus para radianos
		double lat1Rad = Math.toRadians(lat1);
		double lon1Rad = Math.toRadians(lon1);
		double lat2Rad = Math.toRadians(lat2);
		double lon2Rad = Math.toRadians(lon2);

		// diferença entre coordenadas
		double dLat = lat2Rad - lat1Rad;
		double dLon = lon2Rad - lon1Rad;

		// aplica fórmula de Haversine
		double a = Math.pow(Math.sin(dLat / 2), 2)
				+ Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.pow(Math.sin(dLon / 2), 2);
		
		double c = 2 * Math.asin(Math.sqrt(a));

		// Retornar a distância em km
        return EARTH_RADIUS * c;
	}
}
