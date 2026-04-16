import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Color
} from "three";

export class WebGLParticles {
  private renderer: InstanceType<typeof WebGLRenderer>;
  private scene: InstanceType<typeof Scene>;
  public camera: InstanceType<typeof PerspectiveCamera>;
  private particles!: InstanceType<typeof Points>;
  private width: number;
  private height: number;

  constructor(private canvas: HTMLCanvasElement) {
    this.width = window.innerWidth;
    this.height = 260;

    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearAlpha(0.08);

    this.scene = new Scene();
    this.camera = new PerspectiveCamera(60, this.width / this.height, 1, 1000);
    this.camera.position.z = 70;

    this.createParticles();
    this.animate();
  }

  private createParticles() {
    const count = 900;

    const geometry = new BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }

    geometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );

    const material = new PointsMaterial({
      size: 1.7,
      transparent: true,
      opacity: 0.65,
      color: new Color(1, 1, 1)
    });

    this.particles = new Points(geometry, material);
    this.scene.add(this.particles);
  }

  private animate = () => {
    requestAnimationFrame(this.animate);

    this.particles.rotation.y += 0.0006;
    this.particles.rotation.x += 0.00025;

    this.renderer.render(this.scene, this.camera);
  };
}
