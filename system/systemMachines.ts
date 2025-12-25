
import { SystemClassId } from './systemClassifier';

export interface MachinePart {
  id: string;
  type: 'box' | 'cylinder' | 'torus';
  args: number[];
  position: [number, number, number];
  rotation: [number, number, number];
}

export const MACHINE_MANIFESTS: Record<SystemClassId, MachinePart[]> = {
  BRAND_CHASSIS: [
    { id: 'frame', type: 'box', args: [4, 0.2, 2], position: [0, 0, 0], rotation: [0, 0, 0] },
    { id: 'front_axle', type: 'cylinder', args: [0.05, 0.05, 2.5], position: [-1.5, 0, 0], rotation: [Math.PI / 2, 0, 0] },
    { id: 'rear_axle', type: 'cylinder', args: [0.05, 0.05, 2.5], position: [1.5, 0, 0], rotation: [Math.PI / 2, 0, 0] },
    { id: 'wheel_fl', type: 'torus', args: [0.4, 0.1, 8, 24], position: [-1.5, 0, 1.25], rotation: [0, Math.PI / 2, 0] },
    { id: 'wheel_fr', type: 'torus', args: [0.4, 0.1, 8, 24], position: [-1.5, 0, -1.25], rotation: [0, Math.PI / 2, 0] },
    { id: 'wheel_rl', type: 'torus', args: [0.4, 0.1, 8, 24], position: [1.5, 0, 1.25], rotation: [0, Math.PI / 2, 0] },
    { id: 'wheel_rr', type: 'torus', args: [0.4, 0.1, 8, 24], position: [1.5, 0, -1.25], rotation: [0, Math.PI / 2, 0] },
    { id: 'core', type: 'box', args: [0.8, 0.8, 0.8], position: [0, 0.5, 0], rotation: [0, 0, 0] }
  ],
  WEB_TRANSMISSION: [
    { id: 'main_housing', type: 'box', args: [2.5, 2, 2], position: [0, 0, 0], rotation: [0, 0, 0] },
    { id: 'shaft', type: 'cylinder', args: [0.1, 0.1, 3.5], position: [0, 0, 0], rotation: [0, 0, Math.PI / 2] },
    { id: 'gear_large', type: 'torus', args: [0.8, 0.2, 8, 24], position: [-0.8, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { id: 'gear_medium', type: 'torus', args: [0.6, 0.15, 8, 24], position: [0, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { id: 'gear_small', type: 'torus', args: [0.4, 0.1, 8, 24], position: [0.8, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { id: 'input_flange', type: 'cylinder', args: [0.3, 0.3, 0.4], position: [1.8, 0, 0], rotation: [0, 0, Math.PI / 2] },
    { id: 'output_flange', type: 'cylinder', args: [0.3, 0.3, 0.4], position: [-1.8, 0, 0], rotation: [0, 0, Math.PI / 2] },
    { id: 'control_unit', type: 'box', args: [0.6, 0.4, 0.6], position: [0, 1.2, 0], rotation: [0, 0, 0] }
  ],
  AUTOMATION_ARM: [
    { id: 'pedestal', type: 'cylinder', args: [1, 1, 0.2], position: [0, -1, 0], rotation: [0, 0, 0] },
    { id: 'swivel_base', type: 'cylinder', args: [0.6, 0.6, 0.6], position: [0, -0.6, 0], rotation: [0, 0, 0] },
    { id: 'lower_arm', type: 'box', args: [0.3, 1.5, 0.3], position: [0, 0.4, 0], rotation: [0, 0, 0] },
    { id: 'elbow_joint', type: 'cylinder', args: [0.2, 0.2, 0.5], position: [0, 1.15, 0], rotation: [Math.PI / 2, 0, 0] },
    { id: 'upper_arm', type: 'box', args: [0.2, 1.2, 0.2], position: [0.5, 1.15, 0], rotation: [0, 0, Math.PI / 2] },
    { id: 'wrist_joint', type: 'torus', args: [0.15, 0.05, 8, 16], position: [1.1, 1.15, 0], rotation: [0, Math.PI / 2, 0] },
    { id: 'gripper_l', type: 'box', args: [0.3, 0.1, 0.1], position: [1.3, 1.25, 0], rotation: [0, 0, 0] },
    { id: 'gripper_r', type: 'box', args: [0.3, 0.1, 0.1], position: [1.3, 1.05, 0], rotation: [0, 0, 0] }
  ],
  PLATFORM_RACK: [
    { id: 'external_frame', type: 'box', args: [2, 4, 2], position: [0, 0, 0], rotation: [0, 0, 0] },
    { id: 'rail_fl', type: 'box', args: [0.1, 4, 0.1], position: [-0.9, 0, 0.9], rotation: [0, 0, 0] },
    { id: 'rail_fr', type: 'box', args: [0.1, 4, 0.1], position: [0.9, 0, 0.9], rotation: [0, 0, 0] },
    { id: 'blade_01', type: 'box', args: [1.8, 0.2, 1.8], position: [0, 1, 0], rotation: [0, 0, 0] },
    { id: 'blade_02', type: 'box', args: [1.8, 0.2, 1.8], position: [0, 0.5, 0], rotation: [0, 0, 0] },
    { id: 'blade_03', type: 'box', args: [1.8, 0.2, 1.8], position: [0, 0, 0], rotation: [0, 0, 0] },
    { id: 'pdu_unit', type: 'box', args: [1.8, 0.4, 0.4], position: [0, -1, 0.7], rotation: [0, 0, 0] },
    { id: 'base_mount', type: 'cylinder', args: [1.2, 1.2, 0.1], position: [0, -2, 0], rotation: [0, 0, 0] }
  ],
  GROWTH_TURBO: [
    { id: 'intake_housing', type: 'torus', args: [1.2, 0.4, 12, 32], position: [0.8, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { id: 'exhaust_housing', type: 'torus', args: [1, 0.35, 12, 32], position: [-0.8, 0, 0], rotation: [0, Math.PI / 2, 0] },
    { id: 'central_shaft', type: 'cylinder', args: [0.1, 0.1, 2.2], position: [0, 0, 0], rotation: [0, 0, Math.PI / 2] },
    { id: 'compressor_wheel', type: 'cylinder', args: [0.8, 0.1, 0.2], position: [0.8, 0, 0], rotation: [0, 0, Math.PI / 2] },
    { id: 'turbine_wheel', type: 'cylinder', args: [0.7, 0.1, 0.2], position: [-0.8, 0, 0], rotation: [0, 0, Math.PI / 2] },
    { id: 'oil_feed', type: 'box', args: [0.4, 0.4, 0.4], position: [0, 0.6, 0], rotation: [0, 0, 0] },
    { id: 'wastegate', type: 'cylinder', args: [0.2, 0.2, 0.5], position: [-0.5, 0.8, 0.5], rotation: [Math.PI / 4, 0, 0] },
    { id: 'mounting_flange', type: 'box', args: [1.2, 0.1, 1.2], position: [-0.8, -0.6, 0], rotation: [0, 0, 0] }
  ]
};
