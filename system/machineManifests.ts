export type MachineType = 'BRAND_CHASSIS' | 'WEB_TRANSMISSION' | 'AUTOMATION_ARM' | 'PLATFORM_RACK' | 'GROWTH_TURBO';

export interface MachinePart {
  id: string;
  type: 'box' | 'cylinder' | 'torus';
  args: number[];
  pos: [number, number, number];
  rot: [number, number, number];
}

export const MACHINE_MANIFESTS: Record<MachineType, MachinePart[]> = {
  BRAND_CHASSIS: [
    { id: 'frame', type: 'box', args: [4, 0.2, 2], pos: [0, 0, 0], rot: [0, 0, 0] },
    { id: 'axle_f', type: 'cylinder', args: [0.05, 0.05, 2.4], pos: [1.5, 0, 0], rot: [Math.PI/2, 0, 0] },
    { id: 'axle_r', type: 'cylinder', args: [0.05, 0.05, 2.4], pos: [-1.5, 0, 0], rot: [Math.PI/2, 0, 0] },
    { id: 'wheel_fl', type: 'torus', args: [0.4, 0.15, 8, 24], pos: [1.5, 0, 1.2], rot: [0, Math.PI/2, 0] },
    { id: 'wheel_fr', type: 'torus', args: [0.4, 0.15, 8, 24], pos: [1.5, 0, -1.2], rot: [0, Math.PI/2, 0] },
    { id: 'wheel_rl', type: 'torus', args: [0.4, 0.15, 8, 24], pos: [-1.5, 0, 1.2], rot: [0, Math.PI/2, 0] },
    { id: 'wheel_rr', type: 'torus', args: [0.4, 0.15, 8, 24], pos: [-1.5, 0, -1.2], rot: [0, Math.PI/2, 0] },
    { id: 'engine_block', type: 'box', args: [0.8, 0.8, 0.8], pos: [1, 0.5, 0], rot: [0, 0, 0] }
  ],
  WEB_TRANSMISSION: [
    { id: 'housing', type: 'box', args: [3, 2, 2], pos: [0, 0, 0], rot: [0, 0, 0] },
    { id: 'shaft_main', type: 'cylinder', args: [0.1, 0.1, 4], pos: [0, 0, 0], rot: [0, 0, Math.PI/2] },
    { id: 'gear_1', type: 'torus', args: [0.6, 0.2, 8, 24], pos: [-1, 0, 0], rot: [0, Math.PI/2, 0] },
    { id: 'gear_2', type: 'torus', args: [0.5, 0.15, 8, 24], pos: [0, 0, 0], rot: [0, Math.PI/2, 0] },
    { id: 'gear_3', type: 'torus', args: [0.4, 0.1, 8, 24], pos: [1, 0, 0], rot: [0, Math.PI/2, 0] },
    { id: 'shift_fork', type: 'box', args: [0.1, 1.2, 0.8], pos: [0, 0.8, 0], rot: [0, 0, 0] },
    { id: 'flange_in', type: 'cylinder', args: [0.3, 0.3, 0.5], pos: [-2, 0, 0], rot: [0, 0, Math.PI/2] },
    { id: 'flange_out', type: 'cylinder', args: [0.3, 0.3, 0.5], pos: [2, 0, 0], rot: [0, 0, Math.PI/2] }
  ],
  AUTOMATION_ARM: [
    { id: 'base', type: 'cylinder', args: [1, 1, 0.2], pos: [0, -1, 0], rot: [0, 0, 0] },
    { id: 'pivot_base', type: 'cylinder', args: [0.5, 0.5, 0.5], pos: [0, -0.6, 0], rot: [0, 0, 0] },
    { id: 'arm_lower', type: 'box', args: [0.3, 1.5, 0.3], pos: [0, 0.4, 0], rot: [0, 0, 0] },
    { id: 'joint_elbow', type: 'cylinder', args: [0.2, 0.2, 0.4], pos: [0, 1.2, 0], rot: [Math.PI/2, 0, 0] },
    { id: 'arm_upper', type: 'box', args: [0.2, 1.2, 0.2], pos: [0.4, 1.2, 0], rot: [0, 0, Math.PI/2] },
    { id: 'joint_wrist', type: 'cylinder', args: [0.1, 0.1, 0.3], pos: [1, 1.2, 0], rot: [0, 0, Math.PI/2] },
    { id: 'gripper_l', type: 'box', args: [0.3, 0.05, 0.1], pos: [1.2, 1.25, 0], rot: [0, 0, 0] },
    { id: 'gripper_r', type: 'box', args: [0.3, 0.05, 0.1], pos: [1.2, 1.15, 0], rot: [0, 0, 0] }
  ],
  PLATFORM_RACK: [
    { id: 'cabinet', type: 'box', args: [2, 4, 2], pos: [0, 0, 0], rot: [0, 0, 0] },
    { id: 'rail_l', type: 'box', args: [0.1, 3.8, 0.1], pos: [-0.9, 0, 0.9], rot: [0, 0, 0] },
    { id: 'rail_r', type: 'box', args: [0.1, 3.8, 0.1], pos: [0.9, 0, 0.9], rot: [0, 0, 0] },
    { id: 'pdu', type: 'box', args: [1.8, 0.2, 0.4], pos: [0, -1.8, 0.7], rot: [0, 0, 0] },
    { id: 'server_1', type: 'box', args: [1.8, 0.2, 1.8], pos: [0, 1, 0], rot: [0, 0, 0] },
    { id: 'server_2', type: 'box', args: [1.8, 0.2, 1.8], pos: [0, 0.5, 0], rot: [0, 0, 0] },
    { id: 'server_3', type: 'box', args: [1.8, 0.2, 1.8], pos: [0, 0, 0], rot: [0, 0, 0] },
    { id: 'top_fan', type: 'cylinder', args: [0.6, 0.6, 0.1], pos: [0, 2, 0], rot: [0, 0, 0] }
  ],
  GROWTH_TURBO: [
    { id: 'compressor_housing', type: 'torus', args: [1, 0.4, 12, 32], pos: [0.8, 0, 0], rot: [0, Math.PI/2, 0] },
    { id: 'turbine_housing', type: 'torus', args: [0.8, 0.35, 12, 32], pos: [-0.8, 0, 0], rot: [0, Math.PI/2, 0] },
    { id: 'shaft', type: 'cylinder', args: [0.1, 0.1, 2], pos: [0, 0, 0], rot: [0, 0, Math.PI/2] },
    { id: 'impeller', type: 'cylinder', args: [0.7, 0.7, 0.2], pos: [0.8, 0, 0], rot: [0, 0, Math.PI/2] },
    { id: 'turbine_wheel', type: 'cylinder', args: [0.6, 0.6, 0.2], pos: [-0.8, 0, 0], rot: [0, 0, Math.PI/2] },
    { id: 'oil_inlet', type: 'box', args: [0.2, 0.4, 0.2], pos: [0, 0.6, 0], rot: [0, 0, 0] },
    { id: 'wastegate', type: 'cylinder', args: [0.15, 0.15, 0.4], pos: [-0.4, 0.8, 0.4], rot: [Math.PI/4, 0, 0] },
    { id: 'mounting_plate', type: 'box', args: [1, 0.1, 1], pos: [-0.8, -0.6, 0], rot: [0, 0, 0] }
  ]
};