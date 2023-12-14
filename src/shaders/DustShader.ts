export const DustShader = {
  vertexShader: `
    attribute float size;
    
		void main() {
			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
			gl_PointSize = size * 10.0;
			gl_Position = projectionMatrix * mvPosition;
		}
  `,
  fragmentShader: `
    uniform vec3 color;
		uniform sampler2D pointTexture;

		void main() {
			gl_FragColor = vec4( color, 0.5 );
			gl_FragColor = gl_FragColor * texture2D( pointTexture, gl_PointCoord );
		}
  `,
  uniforms: {
    color: {
      type: "c",
      value: "",
    },
    pointTexture: {
      type: "t",
      value: "",
    },
  },
}
