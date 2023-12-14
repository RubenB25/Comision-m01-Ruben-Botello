import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { applyValidations } from '../../middlewares/apply-validations.js';

export const createCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  body('content')
    .notEmpty().withMessage('El campo { name } no debe estar vacio.')
    .isString().withMessage('El campo { name } debe ser un string.'),
  body('author')
    .notEmpty().withMessage('El campo { author } no debe estar vacio.')
    .isString().withMessage('El campo { author } debe ser un string.')
    .custom(isValidObjectId).withMessage('El campo { author } debe ser una id valida.'),
  applyValidations,
];

export const listCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  applyValidations,
];

export const deleteCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id valida.'),
  applyValidations,
];

export const getCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id valida.'),
  applyValidations,
];

export const updateCommentValidations = [
  param('postId')
    .notEmpty().withMessage('El parametro { postId } no debe estar vacio.')
    .isString().withMessage('El parametro { postId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { postId } debe ser una id valida.'),
  param('commentId')
    .notEmpty().withMessage('El parametro { commentId } no debe estar vacio.')
    .isString().withMessage('El parametro { commentId } debe ser un string.')
    .custom(isValidObjectId).withMessage('El parametro { commentId } debe ser una id valida.'),
  body('name')
    .optional()
    .notEmpty().withMessage('El campo { name } no debe estar vacio.')
    .isString().withMessage('El campo { name } debe ser un string.'),
  body('artist')
    .optional()
    .notEmpty().withMessage('El campo { artist } no debe estar vacio.')
    .isString().withMessage('El campo { artist } debe ser un string.'),
  body('year')
    .optional()
    .isNumeric().withMessage('El campo { year } debe ser un año válido.')
    .notEmpty().withMessage('El campo { year } no debe estar vacio.'),
  applyValidations,
];
